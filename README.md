knowledge_base
==============

[![circle]](https://circleci.com/gh/dobtco/knowledge_base)

The DOBT knowledge base. [View the live site](http://help.dobt.co)

[![screenshot](http://cl.ly/image/0u1l273z2D2Z/Screen%20Shot%202014-08-15%20at%203.52.00%20PM.png)](http://help.dobt.co)

## Overall Goals

Our users are largely non-technical, so it will be a good source of info for them. Use cases include:

- Using it to run trainings/self-trainings
- Linking to it when we get support requests
- Linking to it from pages inside of our apps
- Using it as a sales tool: sometimes, instead of giving a demo, we can link folks to the appropriate sections in the knowledge base
- SEO

## Technical details

Built with [Wintersmith](https://github.com/jnordberg/wintersmith). Hosted on GitHub Pages. Search powered by a small node app running on Heroku.

## Format

Each article (page) in the knowledge base has sections and FAQs. The sections are cut-and-dry "here's how to use X". The FAQs are more specific questions that we can answer. Sections and FAQs are separated by a `---` in the markdown file.

The directory structure is:

`[App Name]/[Section]/[Article].md`

for example:

`screendoor/responses/importing_responses.md`

## Development

You'll need [node and npm](http://nodejs.org) installed.

1. `script/bootstrap`
2. Run the preview server: `wintersmith preview`
3. If you need to run the express-based search indexer: `npm start` or `nodemon search/index.coffee` (the latter will monitor for file changes and reload the server automatically)

## Deployment

Pushing to the `master` branch will automatically run tests (currently just a link-checker) on CircleCI. Pushing to the production branch will run the tests *and* deploy if passing. Changes should always be made in the master branch (or a feature branch) and reviewed prior to being merged into production. `hubot deploy knowledge_base immediately` will create and merge a PR from master &rarr; production for you.

## License

This codebase, with the exception of the content in the `articles/` directory, is MIT licensed. The `articles/` are licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

[circle]: https://circleci-badges.herokuapp.com/dobtco/knowledge_base/c41097bed0dbef49d5bb6ab93435e7ee5d834505
