knowledge_base
==============

The DOBT knowledge base. [See the mockups](https://moqups.com/adamjacobbecker/3TdckdCm/).

Read on to learn about the non-technical aspects of the knowledge base, or jump to the [development](#development) section.

## Overall Goals

Our users are largely non-technical, so it will be a good source of info for them. Use cases include:

- Using it to run trainings/self-trainings
- Linking to it when we get silly support requests
- Linking to it from pages inside of our apps
- Using it as a sales tool: sometimes, instead of giving a demo, we can link folks to the appropriate sections in the knowledge base

Also:

- It might be a good source of SEO for us
- It makes us seem more established, which is always a good thing

## Technical details

Wintersmith + GitHub Pages. Possibly an external service for search?

## Examples of knowledge bases that we like:

- [Wufoo](http://help.wufoo.com/articles/en_US/SurveyMonkeyArticleType/Login) (more on that in a minute...)
- [Stripe](https://support.stripe.com/)
- [Github](https://help.github.com/)

## Format

I'd like to copy [Wufoo's format](http://help.wufoo.com/articles/en_US/SurveyMonkeyArticleType/Login) as much as possible. Each article (page) in the knowledge base will have sections and FAQs. The sections are boring, cut-and-dry "here's how to use X". The FAQs are more specific questions that we can answer. (Our existing support requests will determine what makes it into the FAQs.) Sections and FAQs will be separated by a `---` in the markdown file.

The directory structure will be as follows:

`[App Name]/[Section]/[Article].md`

or for simple apps:

`[App Name]/[Article].md`

## Development

You'll need [node and npm](http://nodejs.org) installed.

1. `npm install -g wintersmith`
2. `npm install`
3. `wintersmith preview`
