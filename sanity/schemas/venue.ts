import { defineType, defineField } from '@sanity/types'

export const venueSchema = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  fields: [
    defineField({ name: 'id',   title: 'ID key', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'name', title: 'Venue name', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: ['bar', 'restaurant', 'bottle_shop'], layout: 'radio' },
      validation: r => r.required(),
    }),
    defineField({ name: 'city',          title: 'City',            type: 'string', initialValue: 'Sofia', validation: r => r.required() }),
    defineField({ name: 'descriptionEn', title: 'Description (EN)', type: 'text', rows: 2 }),
    defineField({ name: 'descriptionBg', title: 'Description (BG)', type: 'text', rows: 2 }),
    defineField({ name: 'address',        title: 'Street address',  type: 'string' }),
    defineField({ name: 'googleMapsUrl',  title: 'Google Maps URL', type: 'url' }),
    defineField({ name: 'instagramUrl',   title: 'Instagram URL',   type: 'url' }),
    defineField({ name: 'active',         title: 'Active',          type: 'boolean', initialValue: true }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [
    { title: 'Name A–Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
    { title: 'City', name: 'city', by: [{ field: 'city', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'type', media: 'photo' },
  },
})
