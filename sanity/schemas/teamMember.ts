import { defineType, defineField } from '@sanity/types'

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name',    title: 'Name',              type: 'string', validation: r => r.required() }),
    defineField({ name: 'role',    title: 'Role (EN)',         type: 'string', validation: r => r.required() }),
    defineField({ name: 'roleBg',  title: 'Role (BG)',         type: 'string' }),
    defineField({ name: 'bioEn',   title: 'Bio (EN)',          type: 'text', rows: 4 }),
    defineField({ name: 'bioBg',   title: 'Bio (BG)',          type: 'text', rows: 4 }),
    defineField({ name: 'order',   title: 'Display order',     type: 'number', initialValue: 99 }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
