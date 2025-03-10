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

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  return { 
    props: { 
      isPreview: preview || false,
      contents: [] // Empty array since we're storing edits in memory
    } 
  };
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
        <title>Prime Dumpster Rental Services</title>
        <meta
          name="description"
          content="Get the dumpster you need fast and at an affordable price! Serving Georgia and North Carolina."
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
          <a href="tel:4702409411">(470) 240-9411</a>
        </Malleable>
        <Malleable id="top-cart" as="div" isActive={isEdit} edits={edits}>
          <a href="/my-cart">0 Items</a>
        </Malleable>
      </div>
      
      <header>
        <Malleable id="logo-link" as="div" isActive={isEdit} edits={edits}>
          <a href="/">
            <img src="/images/logo.png" alt="Prime Dumpster Rental Services" />
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
          Prime Dumpster Rental Services
        </Malleable>
        
        <Malleable id="main-subheading" as="div" isActive={isEdit} edits={edits}>
          Get the dumpster you need fast and at an affordable price! Serving Georgia and North Carolina.
        </Malleable>
        
        <Malleable id="call-to-action" as="div" isActive={isEdit} edits={edits}>
          <a href="tel:4702409411" className="call-to-action">CALL TODAY (470) 240-9411</a>
        </Malleable>
      </div>
      
      <main>
        <article>
          <Malleable id="rent-heading" as="div" isActive={isEdit} edits={edits}>
            <h2 className="green-title">Rent Your Dumpster Today!</h2>
          </Malleable>
        
        <div className="dumpster-grid">
          {/* 15 Yard Dumpster */}
          <div className="dumpster-option">
            <Malleable id="dumpster-15-image" as="div" isActive={isEdit} edits={edits}>
              <a href="/product/15-yard-dumpster">
                <img src="/images/15-yard-dumpster.jpg" alt="15 Yard Dumpster" />
              </a>
            </Malleable>
            
            <div className="dumpster-details">
              <Malleable id="dumpster-15-title" as="div" isActive={isEdit} edits={edits}>
                <a href="/product/15-yard-dumpster">15 Yard Dumpster</a>
              </Malleable>
              
              <ul>
                <Malleable id="dumpster-15-detail-1" as="li" isActive={isEdit} edits={edits}>
                  Holds approx. 4 pickup truck size loads
                </Malleable>
                <Malleable id="dumpster-15-detail-2" as="li" isActive={isEdit} edits={edits}>
                  2 Tons of Disposal Included
                </Malleable>
                <Malleable id="dumpster-15-detail-3" as="li" isActive={isEdit} edits={edits}>
                  $450 - 14 Day Rental
                </Malleable>
              </ul>
            </div>
            
            <Malleable id="book-now-15" as="div" isActive={isEdit} edits={edits}>
              <a href="/product/15-yard-dumpster" className="book-now-button">BOOK NOW</a>
            </Malleable>
          </div>
        
          {/* 20 Yard Dumpster */}
          <div className="dumpster-option">
            <Malleable id="dumpster-20-image" as="div" isActive={isEdit} edits={edits}>
              <a href="/product/20-yard-dumpster">
                <img src="/images/20-yard-dumpster.jpg" alt="20 Yard Dumpster" />
              </a>
            </Malleable>
            
            <div className="dumpster-details">
              <Malleable id="dumpster-20-title" as="div" isActive={isEdit} edits={edits}>
                <a href="/product/20-yard-dumpster">20 Yard Dumpster</a>
              </Malleable>
              
              <ul>
                <Malleable id="dumpster-20-detail-1" as="li" isActive={isEdit} edits={edits}>
                  Holds approx. 6 pickup truck size loads
                </Malleable>
                <Malleable id="dumpster-20-detail-2" as="li" isActive={isEdit} edits={edits}>
                  3 Tons of Disposal Included
                </Malleable>
                <Malleable id="dumpster-20-detail-3" as="li" isActive={isEdit} edits={edits}>
                  $499 - 14 Day Rental
                </Malleable>
              </ul>
            </div>
            
            <Malleable id="book-now-20" as="div" isActive={isEdit} edits={edits}>
              <a href="/product/20-yard-dumpster" className="book-now-button">BOOK NOW</a>
            </Malleable>
          </div>

          {/* 30 Yard Dumpster */}
          <div className="dumpster-option">
            <Malleable id="dumpster-30-image" as="div" isActive={isEdit} edits={edits}>
              <a href="/product/30-yard-dumpster">
                <img src="/images/30-yard-dumpster.jpg" alt="30 Yard Dumpster" />
              </a>
            </Malleable>
            
            <div className="dumpster-details">
              <Malleable id="dumpster-30-title" as="div" isActive={isEdit} edits={edits}>
                <a href="/product/30-yard-dumpster">30 Yard Dumpster</a>
              </Malleable>
              
              <ul>
                <Malleable id="dumpster-30-detail-1" as="li" isActive={isEdit} edits={edits}>
                  Holds approx. 9 pickup truck size loads
                </Malleable>
                <Malleable id="dumpster-30-detail-2" as="li" isActive={isEdit} edits={edits}>
                  4 Tons of Disposal Included
                </Malleable>
                <Malleable id="dumpster-30-detail-3" as="li" isActive={isEdit} edits={edits}>
                  $599 - 14 Day Rental
                </Malleable>
              </ul>
            </div>
            
            <Malleable id="book-now-30" as="div" isActive={isEdit} edits={edits}>
              <a href="/product/30-yard-dumpster" className="book-now-button">BOOK NOW</a>
            </Malleable>
          </div>

          {/* 40 Yard Dumpster */}
          <div className="dumpster-option">
            <Malleable id="dumpster-40-image" as="div" isActive={isEdit} edits={edits}>
              <a href="/product/40-yard-dumpster">
                <img src="/images/40-yard-dumpster.jpg" alt="40 Yard Dumpster" />
              </a>
            </Malleable>
            
            <div className="dumpster-details">
              <Malleable id="dumpster-40-title" as="div" isActive={isEdit} edits={edits}>
                <a href="/product/40-yard-dumpster">40 Yard Dumpster</a>
              </Malleable>
              
              <ul>
                <Malleable id="dumpster-40-detail-1" as="li" isActive={isEdit} edits={edits}>
                  Holds approx. 12 pickup truck size loads
                </Malleable>
                <Malleable id="dumpster-40-detail-2" as="li" isActive={isEdit} edits={edits}>
                  5 Tons of Disposal Included
                </Malleable>
                <Malleable id="dumpster-40-detail-3" as="li" isActive={isEdit} edits={edits}>
                  $699 - 14 Day Rental
                </Malleable>
              </ul>
            </div>
            
            <Malleable id="book-now-40" as="div" isActive={isEdit} edits={edits}>
              <a href="/product/40-yard-dumpster" className="book-now-button">BOOK NOW</a>
            </Malleable>
          </div>
        </div>
        
        <Malleable id="services-heading" as="div" isActive={isEdit} edits={edits}>
          <h2 className="green-title">Our Dumpster Rental Services Are Great For...</h2>
        </Malleable>

        <div className="services-grid">
          {[
            { id: 'service-1', text: 'Fire &amp; Water Restoration' },
            { id: 'service-2', text: 'Commercial Construction' },
            { id: 'service-3', text: 'Demolitions' },
            { id: 'service-4', text: 'Moving' },
            { id: 'service-5', text: 'Basement Purge' },
            { id: 'service-6', text: 'Roofing Tear off' },
            { id: 'service-7', text: 'Remodeling' },
            { id: 'service-8', text: 'Downsizing' },
            { id: 'service-9', text: 'Garage Cleanouts' },
            { id: 'service-10', text: 'Estate Cleanouts' }
          ].map(service => (
            <Malleable key={service.id} id={service.id} as="div" className="service-item" isActive={isEdit} edits={edits}>
              {service.text}
            </Malleable>
          ))}
        </div>
        
        <section className="why-choose-us">
          <Malleable id="why-choose-us-heading" as="h2" isActive={isEdit} edits={edits}>
            Why Choose Prime Dumpster Rental?
          </Malleable>
          
          <div className="reasons-grid">
            <div className="reason-item">
              <Malleable id="reason-1-title" as="h3" isActive={isEdit} edits={edits}>
                Fast &amp; Reliable Service
              </Malleable>
              <Malleable id="reason-1-text" as="p" isActive={isEdit} edits={edits}>
                Same-day or next-day delivery available. We&apos;re always on time and ready to help.
              </Malleable>
            </div>
            <div className="reason-item">
              <Malleable id="reason-2-title" as="h3" isActive={isEdit} edits={edits}>
                Competitive Pricing
              </Malleable>
              <Malleable id="reason-2-text" as="p" isActive={isEdit} edits={edits}>
                Best rates in the industry with transparent pricing and no hidden fees.
              </Malleable>
            </div>
            <div className="reason-item">
              <Malleable id="reason-3-title" as="h3" isActive={isEdit} edits={edits}>
                Professional Team
              </Malleable>
              <Malleable id="reason-3-text" as="p" isActive={isEdit} edits={edits}>
                Experienced staff dedicated to providing excellent customer service.
              </Malleable>
            </div>
            <div className="reason-item">
              <Malleable id="reason-4-title" as="h3" isActive={isEdit} edits={edits}>
                HOA-Friendly Service
              </Malleable>
              <Malleable id="reason-4-text" as="p" isActive={isEdit} edits={edits}>
                Our dumpsters won't damage your driveway. Licensed and insured for your peace of mind.
              </Malleable>
            </div>
          </div>
        </section>
        
        <section className="service-areas">
          <Malleable id="service-areas-heading" as="h2" isActive={isEdit} edits={edits}>
            Our Service Areas
          </Malleable>

          <Malleable id="nyc-areas-heading" as="h3" isActive={isEdit} edits={edits}>
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
            Looking for a dumpster rental company that&apos;s reputable and affordable? At JBS Builder LIC Dumpster Rental, we make dumpster rental simple, cost-effective, and convenient. Prices starting as low as $299! We provide 10-, 15-, 20-, 30-, &amp; 40-yard roll-off dumpsters.
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
        </section>
        </article>
      </main>
      
      <footer>
        <Malleable id="footer-text" as="div" isActive={isEdit} edits={edits}>
          &copy; 2023 JBS Builder LIC Dumpster Rental Services, LLC
        </Malleable>
      </footer>
    </>
  );
}
