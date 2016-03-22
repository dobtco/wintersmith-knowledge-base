---
title: CKAN
order: 5
app_pages:
  - projectadmin-ckansyncs-show
---

<div class='alert'>
    **Note**: CKAN data sync is only available for Enterprise plans.
</div>

Instead of manually releasing open data to your CKAN portal, Screendoor can sync your responses with a CKAN dataset automatically. Revisions to responses can even be reflected in your portal in real time.

### Connecting to CKAN

If you have a CKAN account, visit your project's Settings page, and select "Integrations" from the sidebar. Click "Enable" next to CKAN.

![The Integrations page.](../images/ckan_1.png)

On the Connect to CKAN page, fill in the URL and API key of your CKAN data portal.

![The Connect to CKAN page.](../images/ckan_2.png)

### Choosing responses to sync

Screendoor will sync all responses by default. To sync only a subset of your responses, click "Edit filters?"

![Editing sync filters.](../images/ckan_3.png)

In the modal that appears, you can choose to filter responses with a specific status or label or those that contain a certain word or phrase. Press the "Filter responses" button to save your filters.

![The filtering modal.](../images/socrata_4.png)

Finally, to start syncing the responses that match your filters, press the "Start syncing."

![Start syncing responses to CKAN.](../images/ckan_4.png)
