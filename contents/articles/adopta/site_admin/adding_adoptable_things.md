---
title: Adding adoptable things
order: 2
---

<div class='alert'>
    **Note**: We'll be using &ldquo;hydrant&rdquo; as the example &ldquo;thing,&rdquo; but replace this with whatever &ldquo;Singular thing name&rdquo; you set up when you [configured your site](configuring_your_site.html#basic-info).
</div>

To add some adoptable hydrants, click the &ldquo;Hydrants&rdquo; link.

![thing](../images/thing.png)

### Adding hydrants manually

To manually add a hydrant, click the &ldquo;New hydrant&rdquo; link from the &ldquo;Hydrants&rdquo; page.

![add manually](../images/add_manually.png)

Then, fill in the latitude and longitude of your hydrant's location and an optional name for your hydrant.

![new hydrant](../images/new_hydrant.png)

Click &ldquo;Create Thing&rdquo; to add your hydrant to the map.

### Importing hydrants from a CSV file

To import your hydrants from a CSV file, click the &ldquo;Import hydrants from file&rdquo; button. Then, click the &ldquo;Choose File&rdquo; button and select your CSV file. Click &ldquo;Import&rdquo; to import your CSV file into Adopta.

![choose file](../images/choose_file.png)

Here's an example of a simple CSV file that you can use to import hydrants:

    lat,lng
    37.875271,-122.271025
    37.875271,-122.261025

You can also include the `name` header:

    lat,lng,name
    37.875271,-122.271025,some hydrant
    37.875271,-122.261025,another hydrant

> **Advanced feature**: If you add an `id` header and specify an `id` for some of your CSV rows, Adopta will look for an existing hydrant with a matching `id`. If it finds one, it will overwrite its name, latitude, and longitude with the values defined in your CSV file.


### Viewing your added hydrants

Once you've added some hydrants, view them on your Adopta site by clicking the &ldquo;View site&rdquo; link.

![view site](../images/view_site.png)
