knowledge_base
==============

The DOBT knowledge base. [View the live site](http://help.dobt.co)

## Overall Goals

Our users are largely non-technical, so it will be a good source of info for them. Use cases include:

- Using it to run trainings/self-trainings
- Linking to it when we get silly support requests
- Linking to it from pages inside of our apps
- Using it as a sales tool: sometimes, instead of giving a demo, we can link folks to the appropriate sections in the knowledge base

Also, it might be a good source of SEO for us

## Technical details

Built with [Wintersmith](https://github.com/jnordberg/wintersmith). Hosted on GitHub Pages. Search powered by a small node app running on Heroku.


## Format

Each article (page) in the knowledge base will have sections and FAQs. The sections are boring, cut-and-dry "here's how to use X". The FAQs are more specific questions that we can answer. (Our existing support requests will determine what makes it into the FAQs.) Sections and FAQs will be separated by a `---` in the markdown file.

The directory structure will be as follows:

`[App Name]/[Section]/[Article].md`


## Development

You'll need [node and npm](http://nodejs.org) installed.

1. `npm install -g coffee-script`
2. `npm install -g wintersmith`
3. `npm install`
4. `wintersmith preview`

## Deployment

From the root directory, first start a local server with `wintersmith preview` (to allow the link checker to do its business), then run `grunt deploy`. This will build via wintersmith, push to the `gh-pages` branch in this repository, and push our search index to Heroku. (Note: this task will fail unless you have the correct permissions on Heroku.)
