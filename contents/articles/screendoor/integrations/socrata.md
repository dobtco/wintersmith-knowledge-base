---
title: Socrata
order: 1
app_pages:
  - projectadmin-socratasyncs-show
---

<div class='alert'>
    **Note**: Socrata data sync is only available for Enterprise plans.
</div>

Instead of manually releasing open data to your Socrata portal, Screendoor can sync responses to your forms with a Socrata data set automatically. If you have Socrata sync enabled, revisions to responses will even be reflected in Socrata in real time. It helps your team become more transparent, without the administrative overhead.

### Connecting to Socrata

If you have a Socrata account, visit your project's Settings page, and select &ldquo;Socrata sync&rdquo; from the sidebar.

Fill in the web address of your Socrata data portal and click "Connect your Socrata account." You'll be redirected to the Socrata sign-in page (unless you're already signed in). Sign in to Socrata and click the "Allow" button to finish connecting to Socrata and go back to Screendoor.

## Choosing responses to sync

Click the "Choose responses" button to choose which responses you'd like to sync to Socrata. Then, enter a search query and/or add custom filters. For example, if you only want to sync responses with a specific status or label, click "Add filter" and select the appropriate options from the dropdowns. If you're not sure how to filter the responses you want, [read more about searching for responses here](/articles/screendoor/responses//searching_for_responses.html).

To sync all responses, just leave everything blank.

![choose responses](../images/socrata_choose_responses.png)

Click "Filter responses" and you'll see how many responses match your filters.

## Enabling Socrata sync

If everything looks good, click "Start syncing" to enable Socrata sync

![enable sync](../images/socrata_enable_sync.png)

That's all there is to it: the responses you selected will be automatically synced to Socrata! If any new responses are submitted that match your filters, they'll be added to your Socrata dataset. If you edit or delete responses, they'll get modified or deleted in Socrata as well.
