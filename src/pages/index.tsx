import S3 from 'aws-sdk/clients/s3';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useCallback, useRef, useState } from 'react';
import Edit from '../components/edit';
import { ErrorDialog } from '../components/error';
import { ShareLinkDialog } from '../components/home/ShareLinkDialog';
import Malleable, { FieldEdit } from '../components/malleable';
import Snapshot from '../components/snapshot';
import { useScrollReset } from '../hooks/use-scroll-reset';
import layoutStyles from '../styles/layout.module.css';

// Next.js automatically eliminates code used for `getStaticProps`!
// This code (and the `aws-sdk` import) will be absent from the final client-
// side JavaScript bundle(s).
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

export const getStaticProps: GetStaticProps = async ({
  preview,
  previewData,
}) => {
  if (preview) {
    return {
      props: { 
        isPreview: true,
        contents: [] // Empty array since we're not using S3 storage
      },
    };
  }
  return { props: { isPreview: false } };
};

export default function Home(props) {
  // Scroll to top on mount as to ensure the user sees the "Preview Mode" bar
  useScrollReset();

  const [currentSnapshotId, setSnapshotId] = useState(null);
  const clearSnapshot = useCallback(() => setSnapshotId(null), [setSnapshotId]);

  const [isEdit, setEdit] = useState(false);
  const toggleEdit = useCallback(() => setEdit(!isEdit), [isEdit]);

  // Prevent duplication before re-render
  const hasSaveRequest = useRef(false);
  const [isSharingView, _setSharing] = useState(false);
  const setSharing = useCallback(
    (sharing: boolean) => {
      hasSaveRequest.current = sharing;
      _setSharing(sharing);
    },
    [hasSaveRequest, _setSharing]
  );

  const [currentError, setError] = useState<Error>(null);
  const onClearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const share = useCallback(() => {
    if (hasSaveRequest.current) return;
    setSharing(true);

    const els = document.querySelectorAll('[id] > [contenteditable=true]');
    const persistContents: FieldEdit[] = [].slice
      .call(els)
      .map(({ parentNode: { id }, innerText }) => ({ id, innerText }));

    self
      .fetch(`/api/save`, {
        method: 'POST',
        body: JSON.stringify(persistContents),
        headers: { 'content-type': 'application/json' },
      })
      .then((res) => {
        if (res.ok) return res.json();
        return new Promise(async (_, reject) =>
          reject(new Error(await res.text()))
        );
      })
      .then(({ snapshotId }) => {
        setSnapshotId(snapshotId);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setSharing(false);
      });
  }, []);

  const edits = props.isPreview ? props.contents : [];
  return (
    <>
      <Head>
        <title>JBS Dumpster Rental</title>
        <meta
          name="description"
          content="Get affordable dumpster rentals delivered fast! Serving Queens, Manhattan, Brooklyn, and Bronx."
        ></meta>
      </Head>
      {currentError && (
        <ErrorDialog onExit={onClearError}>
          <p>
            An error occurred while saving your snapshot. Please try again in a
            bit.
          </p>
          <pre>{currentError.message}</pre>
        </ErrorDialog>
      )}
      {currentSnapshotId && (
        <ShareLinkDialog
          snapshotId={currentSnapshotId}
          onExit={clearSnapshot}
        />
      )}
      <div className={layoutStyles.layout}>
        {(props.isPreview || props.hasError) && (
          <aside role="alert">
            <a href="/api/exit">Preview Mode</a>
          </aside>
        )}
        {props.hasError ? (
          <>
            <h1>Oops</h1>
            <h2>Something unique to your preview went wrong.</h2>
            <div className="explanation" style={{ textAlign: 'center' }}>
              <p>
                The production website is <strong>still available</strong> and
                this does not affect other users.
              </p>
            </div>
            <hr />
            <h2>Reason</h2>
            <div className="explanation" style={{ textAlign: 'center' }}>
              <p>{props.message}</p>
            </div>
          </>
        ) : (
          <Content isEdit={isEdit} edits={edits} />
        )}
      </div>
      {isEdit ? (
        <>
          <Snapshot
            onCancel={toggleEdit}
            onShare={share}
            isSharing={isSharingView}
          />
        </>
      ) : (
        <Edit onClick={toggleEdit} />
      )}
    </>
  );
}

function Content({ isEdit, edits }: { isEdit: boolean; edits: FieldEdit[] }) {
  return (
    <>
      <div className="top-bar">
        <Malleable id="top-phone" as="div" isActive={isEdit} edits={edits}>
          <a href="tel:5165151951">(516) 515-1951</a>
        </Malleable>
        <Malleable id="top-hours" as="div" isActive={isEdit} edits={edits}>
          <span>Mon-Fri: 8AM-6PM</span>
        </Malleable>
      </div>
      
      <header>
        <Malleable id="logo-link" as="div" isActive={isEdit} edits={edits}>
          <a href="/">
            <img src="/images/logo.png" alt="JBS Builder LIC" />
          </a>
        </Malleable>
        <nav>
          <ul>
            <li>
              <Malleable id="nav-home" as="div" isActive={isEdit} edits={edits}>
                <a href="/">Home</a>
              </Malleable>
            </li>
            <li>
              <Malleable id="nav-checkout" as="div" isActive={isEdit} edits={edits}>
                <a href="/checkout">Checkout</a>
              </Malleable>
            </li>
            <li>
              <Malleable id="nav-cart" as="div" isActive={isEdit} edits={edits}>
                <a href="/my-cart">My Cart</a>
              </Malleable>
            </li>
          </ul>
        </nav>
      </header>
      
      <div className="hero">
        <Malleable id="main-heading" as="h1" isActive={isEdit} edits={edits}>
          JBS Dumpster Rental
        </Malleable>
        
        <Malleable id="main-subheading" as="div" isActive={isEdit} edits={edits}>
          Get the dumpster you need fast and at an affordable price! Serving Queens, Manhattan, Brooklyn, and Bronx.
        </Malleable>
        
        <Malleable id="call-to-action" as="div" isActive={isEdit} edits={edits}>
          <a href="tel:5165151951" className="call-to-action">CALL TODAY (516) 515-1951</a>
        </Malleable>
      </div>
      
      <main>
        <article>
          <Malleable id="rent-heading" as="div" isActive={isEdit} edits={edits}>
            <h2 className="green-title">Rent Your Dumpster Today!</h2>
          </Malleable>
        
        <div className="dumpster-grid">
          {/* 10 Yard Dumpster */}
          <div className="dumpster-option">
            <Malleable id="service-10yard-image" as="div" isActive={isEdit} edits={edits}>
              <a href="/services/10-yard">
                <img src="/images/10-yard.jpg" alt="10 Yard Dumpster" />
              </a>
            </Malleable>
            
            <div className="dumpster-details">
              <Malleable id="service-10yard-title" as="div" isActive={isEdit} edits={edits}>
                <a href="/services/10-yard">10 Yard Dumpster</a>
              </Malleable>
              
              <ul>
                <Malleable id="service-10yard-detail-1" as="li" isActive={isEdit} edits={edits}>
                  Holds approx. 3 pickup truck size loads
                </Malleable>
                <Malleable id="service-10yard-detail-2" as="li" isActive={isEdit} edits={edits}>
                  2 Tons of Disposal Included
                </Malleable>
                <Malleable id="service-10yard-detail-3" as="li" isActive={isEdit} edits={edits}>
                  $399 - 14 Day Rental
                </Malleable>
              </ul>
            </div>
            
            <Malleable id="book-now-10yard" as="div" isActive={isEdit} edits={edits}>
              <a href="/services/10-yard" className="book-now-button">BOOK NOW</a>
            </Malleable>
          </div>


          {/* 15 Yard Dumpster */}
          <div className="dumpster-option">
            <Malleable id="service-15yard-image" as="div" isActive={isEdit} edits={edits}>
              <a href="/services/15-yard">
                <img src="/images/15-yard.jpg" alt="15 Yard Dumpster" />
              </a>
            </Malleable>
            
            <div className="dumpster-details">
              <Malleable id="service-15yard-title" as="div" isActive={isEdit} edits={edits}>
                <a href="/services/15-yard">15 Yard Dumpster</a>
              </Malleable>
              
              <ul>
                <Malleable id="service-15yard-detail-1" as="li" isActive={isEdit} edits={edits}>
                  Holds approx. 4 pickup truck size loads
                </Malleable>
                <Malleable id="service-15yard-detail-2" as="li" isActive={isEdit} edits={edits}>
                  2 Tons of Disposal Included
                </Malleable>
                <Malleable id="service-15yard-detail-3" as="li" isActive={isEdit} edits={edits}>
                  $450 - 14 Day Rental
                </Malleable>
              </ul>
            </div>
            
            <Malleable id="book-now-15yard" as="div" isActive={isEdit} edits={edits}>
              <a href="/services/15-yard" className="book-now-button">BOOK NOW</a>
            </Malleable>
          </div>
        
          {/* 20 Yard Dumpster */}
          <div className="dumpster-option">
            <Malleable id="service-20yard-image" as="div" isActive={isEdit} edits={edits}>
              <a href="/services/20-yard">
                <img src="/images/20-yard.jpg" alt="20 Yard Dumpster" />
              </a>
            </Malleable>
            
            <div className="dumpster-details">
              <Malleable id="service-20yard-title" as="div" isActive={isEdit} edits={edits}>
                <a href="/services/20-yard">20 Yard Dumpster</a>
              </Malleable>
              
              <ul>
                <Malleable id="service-20yard-detail-1" as="li" isActive={isEdit} edits={edits}>
                  Holds approx. 6 pickup truck size loads
                </Malleable>
                <Malleable id="service-20yard-detail-2" as="li" isActive={isEdit} edits={edits}>
                  3 Tons of Disposal Included
                </Malleable>
                <Malleable id="service-20yard-detail-3" as="li" isActive={isEdit} edits={edits}>
                  $499 - 14 Day Rental
                </Malleable>
              </ul>
            </div>
            
            <Malleable id="book-now-20yard" as="div" isActive={isEdit} edits={edits}>
              <a href="/services/20-yard" className="book-now-button">BOOK NOW</a>
            </Malleable>
          </div>

          {/* 30 Yard Dumpster */}
          <div className="dumpster-option">
            <Malleable id="service-30yard-image" as="div" isActive={isEdit} edits={edits}>
              <a href="/services/30-yard">
                <img src="/images/30-yard.jpg" alt="30 Yard Dumpster" />
              </a>
            </Malleable>
            
            <div className="dumpster-details">
              <Malleable id="service-30yard-title" as="div" isActive={isEdit} edits={edits}>
                <a href="/services/30-yard">30 Yard Dumpster</a>
              </Malleable>
              
              <ul>
                <Malleable id="service-30yard-detail-1" as="li" isActive={isEdit} edits={edits}>
                  Holds approx. 10 pickup truck size loads
                </Malleable>
                <Malleable id="service-30yard-detail-2" as="li" isActive={isEdit} edits={edits}>
                  5 Tons of Disposal Included
                </Malleable>
                <Malleable id="service-30yard-detail-3" as="li" isActive={isEdit} edits={edits}>
                  $575 - 14 Day Rental
                </Malleable>
              </ul>
            </div>
            
            <Malleable id="book-now-30yard" as="div" isActive={isEdit} edits={edits}>
              <a href="/services/30-yard" className="book-now-button">BOOK NOW</a>
            </Malleable>
          </div>

          {/* 40 Yard Dumpster */}
          <div className="dumpster-option">
            <Malleable id="service-40yard-image" as="div" isActive={isEdit} edits={edits}>
              <a href="/services/40-yard">
                <img src="/images/40-yard.jpg" alt="40 Yard Dumpster" />
              </a>
            </Malleable>
            
            <div className="dumpster-details">
              <Malleable id="service-40yard-title" as="div" isActive={isEdit} edits={edits}>
                <a href="/services/40-yard">40 Yard Dumpster</a>
              </Malleable>
              
              <ul>
                <Malleable id="service-40yard-detail-1" as="li" isActive={isEdit} edits={edits}>
                  Holds approx. 14 pickup truck size loads
                </Malleable>
                <Malleable id="service-40yard-detail-2" as="li" isActive={isEdit} edits={edits}>
                  5 Tons of Disposal Included
                </Malleable>
                <Malleable id="service-40yard-detail-3" as="li" isActive={isEdit} edits={edits}>
                  $699 - 14 Day Rental
                </Malleable>
              </ul>
            </div>
            
            <Malleable id="book-now-40yard" as="div" isActive={isEdit} edits={edits}>
              <a href="/services/40-yard" className="book-now-button">BOOK NOW</a>
            </Malleable>
          </div>
        </div>
        
        <Malleable id="services-heading" as="div" isActive={isEdit} edits={edits}>
          <h2 className="green-title">Our Dumpster Rental Services Are Great For...</h2>
        </Malleable>

        <div className="services-grid">
          {[
            { id: 'service-renovation', text: 'Home Renovation' },
            { id: 'service-construction', text: 'Construction Debris' },
            { id: 'service-yard', text: 'Yard Waste' },
            { id: 'service-moving', text: 'Moving & Cleanouts' },
            { id: 'service-storm', text: 'Storm Cleanup' },
            { id: 'service-roofing', text: 'Roofing Materials' },
            { id: 'service-concrete', text: 'Concrete & Dirt' },
            { id: 'service-furniture', text: 'Furniture Removal' },
            { id: 'service-garage', text: 'Garage Cleanouts' },
            { id: 'service-estate', text: 'Estate Cleanouts' }
          ].map(service => (
            <Malleable key={service.id} id={service.id} as="div" className="service-item" isActive={isEdit} edits={edits}>
              {service.text}
            </Malleable>
          ))}
        </div>
        
        <section className="why-choose-us">
          <Malleable id="why-choose-us-heading" as="h2" isActive={isEdit} edits={edits}>
            Why Choose JBS Dumpster Rental?
          </Malleable>
          
          <div className="reasons-grid">
            <div className="reason-item">
              <Malleable id="reason-1-title" as="h3" isActive={isEdit} edits={edits}>
                HOA-Friendly
              </Malleable>
              <Malleable id="reason-1-text" as="p" isActive={isEdit} edits={edits}>
                Our dumpsters are all HOA-friendly and will not damage your driveway. We are a licensed, insured, and family-owned-and-operated business.
              </Malleable>
            </div>
            <div className="reason-item">
              <Malleable id="reason-2-title" as="h3" isActive={isEdit} edits={edits}>
                Affordable Pricing
              </Malleable>
              <Malleable id="reason-2-text" as="p" isActive={isEdit} edits={edits}>
                We offer the most competitive pricing around. Call or text now to see our current rates...you will not be disappointed!
              </Malleable>
            </div>
            <div className="reason-item">
              <Malleable id="reason-3-title" as="h3" isActive={isEdit} edits={edits}>
                Flexible Rental Periods
              </Malleable>
              <Malleable id="reason-3-text" as="p" isActive={isEdit} edits={edits}>
                We offer anywhere from 1 day to 14 days standard rental periods. Service available 7 days a week.
              </Malleable>
            </div>
            <div className="reason-item">
              <Malleable id="reason-4-title" as="h3" isActive={isEdit} edits={edits}>
                Fast Delivery
              </Malleable>
              <Malleable id="reason-4-text" as="p" isActive={isEdit} edits={edits}>
                Same-day or next-day delivery available in most areas. We'll get your dumpster to you when you need it.
              </Malleable>
            </div>
          </div>
        </section>

        <section className="service-areas">
          <Malleable id="service-areas-heading" as="h2" isActive={isEdit} edits={edits}>
            Our Service Areas
          </Malleable>
          
          <Malleable id="nyc-service-areas-heading" as="h3" isActive={isEdit} edits={edits}>
            NYC Service Areas
          </Malleable>
          
          <ul className="areas-list">
            <Malleable id="area-queens" as="li" isActive={isEdit} edits={edits}>
              Queens
            </Malleable>
            <Malleable id="area-manhattan" as="li" isActive={isEdit} edits={edits}>
              Manhattan
            </Malleable>
            <Malleable id="area-brooklyn" as="li" isActive={isEdit} edits={edits}>
              Brooklyn
            </Malleable>
            <Malleable id="area-bronx" as="li" isActive={isEdit} edits={edits}>
              Bronx
            </Malleable>
          </ul>
        </section>
        


        <section className="need-dumpster">
          <Malleable id="need-dumpster-heading" as="h2" isActive={isEdit} edits={edits}>
            Need a dumpster fast?
          </Malleable>

          <Malleable id="need-dumpster-text" as="div" isActive={isEdit} edits={edits}>
            Looking for a dumpster rental company that&apos;s reputable and affordable? At JBS Dumpster Rental, we make dumpster rental simple, cost-effective, and convenient. Prices starting as low as $299! We provide 10, 15, 20, 30, &amp; 40 yard roll-off dumpsters.
          </Malleable>

          <Malleable id="call-to-action-2" as="div" isActive={isEdit} edits={edits}>
            <a href="tel:5165151951" className="call-to-action">CALL TODAY (516) 515-1951</a>
          </Malleable>
        </section>

        <section className="contact">
          <Malleable id="contact-heading" as="h2" isActive={isEdit} edits={edits}>
            CONTACT US
          </Malleable>
          
          <Malleable id="contact-text" as="div" isActive={isEdit} edits={edits}>
            Fill out this form or call us anytime at <a href="tel:5165151951">(516) 515-1951</a> and we will be in touch with you shortly!
          </Malleable>

          <form>
            <div className="form-group">
              <label htmlFor="name">
                <Malleable id="name-label" as="div" isActive={isEdit} edits={edits}>
                  Name
                </Malleable>
              </label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <Malleable id="email-label" as="div" isActive={isEdit} edits={edits}>
                  Email
                </Malleable>
              </label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                <Malleable id="phone-label" as="div" isActive={isEdit} edits={edits}>
                  Phone
                </Malleable>
              </label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">
                <Malleable id="message-label" as="div" isActive={isEdit} edits={edits}>
                  Message
                </Malleable>
              </label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <div className="form-submit">
              <Malleable id="submit-button" as="div" isActive={isEdit} edits={edits}>
                <button type="submit">Send Message</button>
              </Malleable>
            </div>
          </form>
        </section>
        </article>
      </main>
      
      <footer>
        <Malleable id="footer-text" as="div" isActive={isEdit} edits={edits}>
          &copy; 2024 JBS Dumpster Rental
        </Malleable>
      </footer>
    </>
  );
}
