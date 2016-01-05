---
title: Collecting responses via email
order: 6
---

In some cases, you might wish to let respondents submit to your project through email. By using Zapier, you can configure this integration without writing a line of code.

### Getting started

First, follow the instructions to [connect your Zapier account](/articles/screendoor/integrations/zapier.html).

Ensure that your Screendoor project has at least two form fields, one for the email's subject and another for its body.

Next, from Zapier's homepage, click the "Make a new zap" button. For the trigger app, select "Email by Zapier" and "New Inbound Email". For the action app, choose "Screendoor" and "Create Response":

![Zapier trigger and action](../images/zapier_email_1.png)

Next, create an email address that will be used to forward emails into Screendoor:

![Create an email address in Zapier](../images/zapier_email_2.png)

Go ahead and send a test email to this address -- this will help us test the Zap in the next few steps.

Next, you must enter your Screendoor Project ID and click the "Try again?" button, next to the message saying that Zapier had trouble loading fields. (Sometimes Zapier has trouble loading the fields from Screendoor. If this happens, refreshing the webpage usually fixes things.)

![Load fields from Screendoor](../images/zapier_email_3.png)

Finally, you must map the fields from an incoming email to your form fields in Screendoor. If your Screendoor form fields are called "Subject" and "Body", you'll want to configure the Zap to look like this:

![Configured Zapier fields](../images/zapier_email_4.png)

You're all set! You may use the "Test this Zap" section to verify that your zap is working, and click the "Turn Zap on" button at the bottom of the page.

Now, when you send an email to the address that you created, it will show up as a response inside of Screendoor.

<div class='grid margin_bd'>
  <div class='item lap_six_columns'>
    ![Sending an email to Zapier](../images/zapier_email_5.png)
  </div>
  <div class='item lap_six_columns'>
    ![Viewing an email send via Zapier](../images/zapier_email_6.png)
  </div>
</div>

### Advanced parsing of incoming emails

The [Parser by Zapier](https://parser.zapier.com/) service allows you to extract structured data from incoming emails. This can be an extremely powerful tool when used wisely! 

![Parser by Zapier example](../images/parser_by_zapier.png)
