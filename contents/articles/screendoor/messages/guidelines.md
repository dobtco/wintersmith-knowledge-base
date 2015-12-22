---
title: Guidelines and Terms of Service
order: 5
include_formrenderer: true
---

### Guidelines for writing bulk emails

While convenient, bulk messages run the risk of being marked as [spam](http://www.spamhaus.org/consumer/definition/). Here are some pointers to ensure that your respondents receive and read your messages:

#### 1. Choose a clear and concise subject line.

The best subject lines give respondents a specific reason to open your message. Respondents aren't likely to open an email with a vague subject line:
<div class='example_fr fr_no' id='example_fr_1'></div>

Keep the subject line brief and make sure it accurately describes the content of your message:
<div class='example_fr fr_yes' id='example_fr_2'></div>

#### 2. Remind respondents why you're sending them a message.
When a respondent opens your message, you have just a few seconds to hold their attention. If it's been a while since they have heard from you, they may not remember who you are. The first sentence of your message should explain why you're reaching out.

#### 3. Keep your messages short and succinct.

To improve the odds that respondents will read your message, make it short and sweet.

#### 4. Stay on topic.

Your message should directly relate to a respondent's submission to your project. For example, asking respondents to schedule an interview with you is an appropriate use of bulk messaging; asking them to promote your project is not.

#### 5. Keep images to a minimum.
To combat image-based spam, spam filters often flag emails with a high image-to-text ratio. If you want to share images or graphics with your respondents, consider linking to them rather than embedding them directly into your message.

### Terms of Service

We ask that you adhere to the following rules when you're sending bulk messages:

- Do not send messages to respondents whom you have imported from a third-party list unless those respondents have given you explicit permission to email them.
- Do not use third-party email addresses, domain names, or mail servers without proper permission (e.g., a "reply-to" address that you do not own).
- Do not send messages to non-specific addresses (e.g., webmaster@domain.com or info@domain.com).
- Do not send messages that result in an unusually high number of spam complaints.

If you neglect to comply with any of these rules, we may suspend or terminate your use of bulk messaging.

### Reporting abuse

If you think a Screendoor user is violating our Terms of Service, please notify us at [support@dobt.co](mailto:support@dobt.co).

<script>
  function ExampleFR(target, response_fields) {
    return new FormRenderer({
      target: target,
      plugins: [],
      response_fields: response_fields,
      response: {
        id: 'xxx',
        responses: {}
      }
    });
  }

  new ExampleFR(
    '#example_fr_1',
    [
      {
        field_type: 'block_of_text',
        field_options: {
          size: 'medium',
          description: "We need your help"
        }
      }
    ]
  )

  new ExampleFR(
    '#example_fr_2',
    [
      {
        field_type: 'block_of_text',
        field_options: {
          size: 'medium',
          description: "Yaddo 2016 Spring Residency Application Decision"
        }
      }
    ]
  )

</script>
