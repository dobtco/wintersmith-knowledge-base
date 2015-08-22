---
title: Designing a great form
order: 3
include_formrenderer: true
app_pages:
  - projectadmin-wizard-responseform
redirect_from: /articles/screendoor/response_form/form_building_tips.html
---

Your form is the core of your Screendoor project. To ensure that you provide a smooth experience for your respondents and collect accurate and relevant information, we want to help you make your forms:

- **User-friendly**. Your form should be as easy as possible for respondents to fill out. No surprises, no headaches.

- **Clear**. Respondents should understand which information they are being asked to enter and why you need it.

- **Succinct**. A good form is focused and to the point, omitting unnecessary complexity.

## Quick tips

Here are some quick tips that can help you make your forms better.

### Choose the appropriate field for your question

With each field you add to your form, think about the type of answer you want to receive and choose the type of field accordingly.

For example, if you're asking a yes–no question, two checkboxes wouldn't make sense because the user could select both options.

<div class='example_fr fr_no' id='example_fr_1'></div>

Instead, use radio buttons or the "Multiple choice" field in Screendoor.

<div class='example_fr fr_yes' id='example_fr_2'></div>

Here's another example: if you want to collect numeric data, you can use a "Numeric" field rather than a "Text" field. Screendoor will display an error if the user tries to enter anything in this field that isn't a number.

<div class='example_fr fr_yes' id='example_fr_9'></div>

### If your form is long, separate it out into multiple pages

The prospect of filling out a huge form can be overwhelming and deter respondents from even starting. You can make your form more approachable by separating out related fields into sections, and placing each step on a separate page.

### Organize your form into sections

Use section headers ("Section breaks" with labels in Screendoor) to organize your form. Use large section headers to separate out major parts of your form. Use medium and small section headers to identify sub-sections.

<div class='example_fr fr_yes' id='example_fr_11'></div>

### Use blocks of text for long or important instructions

If you need to write more than a paragraph, put it in a "Block of text" rather than the description of a section header. Use large or medium blocks of text for instructions that require special emphasis rather than "\*emphasizing with asterisks\*" or "ALL CAPS."

<div class='example_fr fr_yes' id='example_fr_12'></div>

### Only ask once

Avoid asking for information more than once. For example, if Screendoor is [already collecting names and email addresses](/articles/screendoor/your_form/collecting_names_and_emails.html) from respondents, you don't need to ask for that information again. If you ask respondents for their address in one section of the form, you shouldn't need to ask for it again in another section.

### Don't repeat yourself

If you want to give your respondents information about multiple fields, try to avoid repeating yourself. Redundant information makes the form longer and harder to read.

<div class='example_fr fr_no' id='example_fr_7'></div>

Instead, use section headers and descriptions to tell them once.

<div class='example_fr fr_yes' id='example_fr_8'></div>

### Keep your labels and descriptions concise

Avoid overloading your form with redundant descriptions.

<div class='example_fr fr_no' id='example_fr_3'></div>

Be concise, but give your respondents the information they need to complete your form.

<div class='example_fr fr_yes' id='example_fr_4'></div>

### Always provide clear labels for inputs

Try not to assume that respondents will know the question you're asking just from looking at the field.

<div class='example_fr fr_no' id='example_fr_5'></div>

One great way to keep your forms concise is to have your label and the respondent's answer form a complete sentence, like this:

<div class='example_fr fr_yes' id='example_fr_6'></div>

### Instead of complicated instructions, try using rules

If you need to ask your respondents to skip certain fields of your form depending on their answers to some of your questions, consider using [rules](/articles/screendoor/your_form/building_your_form.html#adding-rules). With rules, Screendoor lets you conditionally hide or show any field on your form. This will make complex forms much more usable.

### Keep your copy clear and consistent

Never use all caps for labels.

<div class='example_fr fr_no' id='example_fr_10'></div>

Use emphasis only when you need to. If you use too much emphasis (**bold**, *italics*, or <u>underlining</u>), the user will ignore it.

## Copy-writing resources

In order to make your project accessible to everyone, we recommend keeping your language as clear and plain as possible. Here are some resources we've found helpful:

- [GovLoop Academy Course on Plain Language](http://academy.govloop.com/courses/plain-language/)
- [Clout: The Art and Science of Influential Web Content](http://www.amazon.com/Clout-Science-Influential-Content-Voices/dp/0321733010) by Colleen Jones
- [Nicely Said: Writing for the Web with Style and Purpose](http://www.amazon.com/Nicely-Said-Writing-Purpose-Voices/dp/0321988191) by Nicole Fenton
- [The Elements of Content Strategy](http://abookapart.com/products/the-elements-of-content-strategy) by Erin Kissane

## Need more help?

Let us help you make your form awesome. We're available for consultation on an hourly basis: [Send us an email](mailto:support@dobt.co) to get in touch.

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
        field_type: 'checkboxes',
        field_options: {
          options: [
            {label: "Yes", checked: false},
            {label: "No", checked: false}
          ]
        }
      }
    ]
  )

  new ExampleFR(
    '#example_fr_2',
    [
      {
        field_type: 'radio',
        field_options: {
          options: [
            {label: "Yes", checked: false},
            {label: "No", checked: false}
          ]
        }
      }
    ]
  )

  new ExampleFR(
    '#example_fr_3',
    [
      {
        field_type: 'file',
        label: 'File upload',
        field_options: {
          description: 'File #4'
        }
      }
    ]
  )

  new ExampleFR(
    '#example_fr_4',
    [
      {
        field_type: 'file',
        label: 'Work sample #4'
      }
    ]
  )

  new ExampleFR(
    '#example_fr_5',
    [
      {
        field_type: 'dropdown',
        label: '',
        field_options: {
          options: [
            {label: "New applicant"},
            {label: "Returning applicant"}
          ]
        }
      }
    ]
  )

  new ExampleFR(
    '#example_fr_6',
    [
      {
        field_type: 'dropdown',
        label: 'I am a...',
        field_options: {
          options: [
            {label: "New applicant"},
            {label: "Returning applicant"}
          ]
        }
      }
    ]
  )

  new ExampleFR(
    '#example_fr_7',
    [
      {
        field_type: 'file',
        label: 'Resume',
        field_options: {
          description: "Click Choose File button above to upload your file. Note: The file must be under 1 mb. Please do not use spaces or the following characters in your file name: ? ! \" / < > * , ; : $ % # &"
        }
      },
      {
        field_type: 'file',
        label: 'CV',
        field_options: {
          description: "Click Choose File button above to upload your file. Note: The file must be under 1 mb. Please do not use spaces or the following characters in your file name: ? ! \" / < > * , ; : $ % # &"
        }
      }
    ]
  )

  new ExampleFR(
    '#example_fr_8',
    [
      {
        field_type: 'section_break',
        label: 'Attachments',
        field_options: {
          description: "Click \"Choose File\" to upload your attachments. Note: Attachments must be under 1 MB. Please do not use spaces or the following characters in your file name: ? ! \" / < > * , ; : $ % # &"
        }
      },
      {
        field_type: 'file',
        label: 'Resume',
      },
      {
        field_type: 'file',
        label: 'CV',
      }
    ]
  )

  new ExampleFR(
    '#example_fr_9',
    [
      {
        field_type: 'number',
        label: '# of pools cleaned'
      }
    ]
  )

  new ExampleFR(
    '#example_fr_10',
    [
      {
        field_type: 'price',
        label: 'TOTAL ESTIMATED COST'
      }
    ]
  )

  new ExampleFR(
    '#example_fr_11',
    [
      {
        field_type: 'section_break',
        label: 'Personal information',
        field_options: {
          size: 'large'
        }
      },
      {
        field_type: 'section_break',
        label: 'Employment',
        field_options: {
          size: 'medium'
        }
      },
      {
        field_type: 'section_break',
        label: 'Income',
        field_options: {
          size: 'small'
        }
      }
    ]
  )

  new ExampleFR(
    '#example_fr_12',
    [
      {
        field_type: 'block_of_text',
        field_options: {
          size: 'medium',
          description: "Please enter only your own income, even if you're married:"
        }
      },
      {
        field_type: 'number',
        label: 'Income'
      }
    ]
  )
</script>
