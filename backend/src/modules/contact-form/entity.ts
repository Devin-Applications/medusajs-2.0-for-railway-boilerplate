import { Entity, PrimaryKey, Property } from "@mikro-orm/core"
import { ulid } from "ulid"

@Entity({ tableName: "contact_form_submission" })
export class ContactFormSubmission {
  @PrimaryKey()
  id: string = ulid()

  @Property()
  name: string

  @Property()
  email: string

  @Property()
  phone: string

  @Property()
  service: string

  @Property({ nullable: true })
  address?: string

  @Property({ columnType: "text" })
  message: string

  @Property()
  created_at: Date = new Date()
}
