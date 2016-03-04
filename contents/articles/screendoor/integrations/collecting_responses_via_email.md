---
title: Collecting responses via email
order: 6
---

In some cases, you might wish to let respondents submit to your project through email. By using Zapier, you can configure this integration without writing a line of code.

### Getting started

First, follow the instructions to [connect your Zapier account to Screendoor](/articles/screendoor/integrations/zapier.html).

Ensure that your Screendoor project has at least two form fields, one for the email's subject line and another for its body.

Next, from Zapier's homepage, click the "Make a New Zap" button. For the trigger, select the app "Email by Zapier" with the action "New Inbound Email." For the action, choose the app "Screendoor" and the action "Create Response":

![Zapier trigger and action](../images/zapier_email_1.png)

Then, create an email address that will be used to forward emails to Screendoor:

![Create an email address in Zapier](../images/zapier_email_2.png)

Go ahead and send a test email to this address -- this will help us test the Zap in the next few steps.

Next, you must enter your Screendoor Project ID and press the "Try again?" button next to the message saying that Zapier had trouble loading fields. (Sometimes Zapier has trouble loading Screendoor form fields. If this happens, refreshing the webpage usually resolves the issue.)

![Load fields from Screendoor](../images/zapier_email_3.png)

Finally, you must map the fields from an incoming email to the form fields in your Screendoor project. If your form fields are called "Subject" and "Body," you'll want to configure the Zap to look like this:

![Configured Zapier fields](../images/zapier_email_4.png)

You may use the "Test this Zap" section to verify that your Zap is working, and press the "Turn Zap on" button at the bottom of the page.

You're all set! Now, when a respondent sends an email to the address that you created, it will show up as a response inside of Screendoor.

<div class='grid margin_bd'>
  <div class='item lap_six_columns'>
    ![Sending an email to Zapier](../images/zapier_email_5.png)
  </div>
  <div class='item lap_six_columns'>
    ![Viewing an email send via Zapier](../images/zapier_email_6.png)
  </div>
</div>

### Advanced parsing of incoming emails

While the above instructions will copy the entire subject line and body from incoming emails, the [Parser by Zapier](https://parser.zapier.com/) service allows you to extract structured data from incoming emails. This can be an extremely powerful tool when used wisely!

![Parser by Zapier example](../images/parser_by_zapier.png)
