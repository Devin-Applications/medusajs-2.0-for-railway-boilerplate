import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    
    const contactData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
      created_at: new Date().toISOString(),
    }
    
    // Store in Medusa custom table or use a simple JSON file for demo
    // For this example, we'll log the data and return success
    // In a real implementation, you would store this in a database
    console.log("Contact form submission:", contactData)
    
    // You can implement actual storage here using Medusa's API
    // For example, creating a custom entity or using metadata
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    )
  }
}
