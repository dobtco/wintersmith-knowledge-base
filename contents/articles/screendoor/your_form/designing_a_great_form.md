---
title: Designing a great form
order: 3
include_formrenderer: true
app_pages:
  - projectadmin-wizard-responseform
---

As you create your Screendoor form, it's worth taking some time to think about how to provide a smooth experience for respondents. When you ensure your forms are usable and easy to complete, it saves your respondents time and helps you collect the most accurate and relevant information.

Your form should try to be:

- **User-friendly**. Your form should be as easy as possible for respondents to fill out. No surprises, no headaches.

- **Clear**. Respondents should understand what information they are being asked to enter and why you need it.

- **Concise**. A good form is focused and to the point, omitting unnecessary complexity.

### Ten ways to design a better form

Here are some quick tips that can help you improve your forms:

#### 1. Choose the appropriate field for your question.

When you add a field to your form, think about the type of answer you want to receive. This will influence the type of field you choose.

For example, if you want an answer of "Yes" or "No," two checkboxes wouldn't make sense, because the user could select both options.

<div class='example_content example_content_bad' id='example_fr_1'></div>

Instead, Screendoor's "multiple choice" field, which lets you select only one option, would be a better fit.

<div class='example_content example_content_good' id='example_fr_2'></div>

Here's another example: if you want the answer to be in the form of a number,  use a "Numeric" field. Screendoor will display an error if the user tries to enter anything in this field that isn't a number.

<div class='example_content example_content_good' id='example_fr_9'></div>

#### 2. Avoid using too much emphasis.

If you use too much emphasis (**bold**, *italics*, or <u>underlining</u>), the user will ignore it. Emphasize text only when you absolutely need to.

Never use all caps for labels.

<div class='example_content example_content_bad' id='example_fr_10'></div>

#### 3. Only ask once.

Try not to ask for the same information twice. For example, Screendoor [already collects names and email addresses for you](/articles/screendoor/your_form/collecting_names_and_emails.html), so you don't need to ask for that information again. If you ask respondents for their address in one section of the form, you shouldn't need to ask for it again in another section.

#### 4. Avoid repetitive descriptions.

If you need to give respondents the same instructions for multiple fields, format your form so that you only need to tell them once.

Redundant information makes the form longer and harder to read.

<div class='example_content example_content_bad' id='example_fr_7'></div>

Instead, use section headers and descriptions to properly organize your instructions.

<div class='example_content example_content_good' id='example_fr_8'></div>

#### 5. Use blocks of text for long or important instructions.

If it's necessary to write descriptive text that is longer than a paragraph, place it in a "Block of text" field, instead of the description of a section header. For instructions that require special emphasis, use large or medium blocks of text instead of emphasizing with \**asterisks*\* or *ALL CAPS*.

<div class='example_content example_content_good' id='example_fr_12'></div>

#### 6. Always provide clear labels for inputs.

Try not to assume that respondents will understand the information you need from them based on the given answer options. That might not be the case.

<div class='example_content example_content_bad' id='example_fr_5'></div>

You can maintain clear and concise labels by having the label and answer form a complete sentence.

<div class='example_content example_content_good' id='example_fr_6'></div>

#### 7. Avoid redundant labels.

Using the same label for multiple inputs makes it harder to distinguish the difference between them.

<div class='example_content example_content_bad' id='example_fr_3'></div>

Try to stay concise while still giving your respondents the information they need to complete your form.

<div class='example_content example_content_good' id='example_fr_4'></div>

#### 8. Organize your form with sections.

Use section breaks to organize your form and provide clear hierarchy. Use large section headers to indicate the major sections of your form. Use medium and small section headers to identify sub-sections.

<div class='example_content example_content_good' id='example_fr_11'></div>

#### 9. For long forms, use page breaks.

When someone encounters a huge form, it can feel overwhelming and deter them from even starting. Make your form more approachable by grouping related fields into sections, and devoting a single page to each section.

#### 10. Instead of asking your respondents to skip sections, use conditional logic instead.

If you need your respondents to skip sections of your form depending on their previous answers, you should consider using [conditional logic](/articles/screendoor/your_form/building_your_form.html#adding-conditional-logic) instead of explaining it in writing. Conditional logic allows you to hide or show any field on your form, making complex forms much more usable.

### Improving your copywriting skills

Plain and clear language helps make your form more accessible to everyone. Learning effective copywriting takes practice, but it's an invaluable skill to learn, and your audience won't be able to thank you enough. Here are some resources we've found helpful:

- [GovLoop Academy Course on Plain Language](http://academy.govloop.com/courses/plain-language/)
- [Clout: The Art and Science of Influential Web Content](http://www.amazon.com/Clout-Science-Influential-Content-Voices/dp/0321733010) by Colleen Jones
- [Nicely Said: Writing for the Web with Style and Purpose](http://www.amazon.com/Nicely-Said-Writing-Purpose-Voices/dp/0321988191) by Nicole Fenton and Kate Kiefer Lee

### Receive a form design consultation

If you want hands-on training on how to make your forms even better, the Screendoor team is available for consultation on an hourly basis. Send us an email at [support@dobt.co](mailto:support@dobt.co) to get in touch.

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
        label: 'Upload a work sample',
        field_options: {
          description: 'Work Sample #1'
        }
      },
      {
        field_type: 'file',
        label: 'Upload a work sample',
        field_options: {
          description: 'Work Sample #2'
        }
      }
    ]
  )

  new ExampleFR(
    '#example_fr_4',
    [
      {
        field_type: 'block_of_text',
        field_options: {
          size: 'medium',
          description: "Please upload samples of your work below."
        }
      },
      {
        field_type: 'file',
        label: 'Work Sample #1'
      },
      {
        field_type: 'file',
        label: 'Work Sample #2'
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
        label: 'Project #1',
        field_options: {
          description: "Please upload a project that you either took a leadership role in, or heavily contributed to. Projects should showcase your primary skill set."
        }
      },
      {
        field_type: 'file',
        label: 'Project #2',
        field_options: {
          description: "Please upload a project that you either took a leadership role in, or heavily contributed to. Projects should showcase your primary skill set."
        }
      }
    ]
  )

  new ExampleFR(
    '#example_fr_8',
    [
      {
        field_type: 'section_break',
        label: 'Projects',
        field_options: {
          description: "Please upload two projects that you either took a leadership role in, or heavily contributed to. Projects should showcase your primary skill set."
        }
      },
      {
        field_type: 'file',
        label: 'Project #1',
      },
      {
        field_type: 'file',
        label: 'Project #2',
      }
    ]
  )

  new ExampleFR(
    '#example_fr_9',
    [
      {
        field_type: 'number',
        label: 'How many pools did the Parks Department clean this week?'
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
        field_type: 'block_of_text',
        label: 'Tell us about yourself.',
        field_options: {
          size: 'medium'
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
        field_type: 'text',
        label: 'Employer Name',
        field_options: {
          size: 'large'
        }
      },
      {
        field_type: 'address',
        label: 'Employer Address',
        field_options: {
          size: 'large'
        }
      },
      {
        field_type: 'section_break',
        label: 'Income',
        field_options: {
          size: 'small'
        }
      },
      {
        field_type: 'price',
        label: 'What is your annual gross income?',
      },
    ]
  )

  new ExampleFR(
    '#example_fr_12',
    [
      {
        field_type: 'block_of_text',
        field_options: {
          size: 'medium',
          description: "Please enter only your own personal income, even if you're married."
        }
      },
      {
        field_type: 'number',
        label: 'Personal Income'
      }
    ]
  )
</script>
