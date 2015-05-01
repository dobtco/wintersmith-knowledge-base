---
title: Identification fields FAQ
order: 7
app_pages:
  - projectwizard-responses
---

## Why does Screendoor collect names and emails by default?

Screendoor needs respondent names and email addresses in order to:

- Identify who submitted a response
- Send [messages](../messages/sending_messages.html) to respondents
- Require [signatures](signatures.html) from respondents

## Can I make responses anonymous?

Sure, just [set the identification level](response_preferences.html#don-t-collect-names-and-email-addresses) for your project to "Keep responses anonymous" and Screendoor will not collect names or email addresses from respondents. However, bear in mind that **keeping responses anonymous is appropriate only if you *never* want to identify or follow up with respondents**. If, on the other hand, you just don't want your reviewers to see respondent names or email addresses, you should [treat respondents names as "blind fields"](response_preferences.html#hiding-respondent-names) instead.

## What are blind fields?

Blind fields are fields that only admins can see. Because reviewers will not be able to view blind fields, they are a great way to keep the review process as unbiased as possible while still collecting information from respondents.

![blind fields](../images/blind_fields.png)

## Can I override the default name and email address fields?

Yes, though overriding Screendoor's default identification fields is only recommended for advanced users. To collect name and email address information in a different format:

1. [Set the identification level](response_preferences.html#don-t-collect-names-and-email-addresses) for your project to "Keep responses anonymous." This will disable Screendoor's default collection of names and email addresses.

2. Add your custom identification fields.

  ![custom id fields](../images/custom_id_fields.png)

3. Set your project's identification fields to your new custom fields. This will enable Screendoor to identify responses and send messages based on these custom fields. Navigate to the "Settings" page for your project and click "Show advanced settings." Then, select your custom fields from the appropriate dropdown.

  ![custom key fields](../images/custom_key_fields.png)
