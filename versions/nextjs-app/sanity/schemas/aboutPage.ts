import { defineType, defineField, defineArrayMember } from '@sanity/types'

export const aboutPageSchema = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  // Singleton — only one document of this type should exist
  fields: [
    defineField({ name: 'headlineEn',  title: 'Headline (EN)',  type: 'string' }),
    defineField({ name: 'headlineBg',  title: 'Headline (BG)',  type: 'string' }),
    defineField({ name: 'subheadEn',   title: 'Subhead (EN)',   type: 'string' }),
    defineField({ name: 'subheadBg',   title: 'Subhead (BG)',   type: 'string' }),
    defineField({
      name: 'bodyEn',
      title: 'Body copy (EN)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'bodyBg',
      title: 'Body copy (BG)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'milestones',
      title: 'Timeline milestones',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'year',      title: 'Year',       type: 'number', validation: r => r.required() }),
            defineField({ name: 'titleEn',   title: 'Title (EN)', type: 'string', validation: r => r.required() }),
            defineField({ name: 'titleBg',   title: 'Title (BG)', type: 'string' }),
            defineField({ name: 'bodyEn',    title: 'Body (EN)',  type: 'text', rows: 2 }),
            defineField({ name: 'bodyBg',    title: 'Body (BG)',  type: 'text', rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'breweryImages',
      title: 'Brewery gallery',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
  ],
  preview: {
    select: { title: 'headlineEn', media: 'heroImage' },
  },
})
