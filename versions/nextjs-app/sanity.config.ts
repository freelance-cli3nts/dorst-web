/**
 * Sanity Studio configuration — NOT imported by Next.js.
 *
 * To use this file:
 *   pnpm add sanity @sanity/vision   (one-time, dev only)
 *   sanity dev                        (runs the Studio on :3333)
 *   sanity deploy                     (deploys to <project>.sanity.studio)
 *
 * Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local first.
 */

// @ts-nocheck — optional peer deps not installed in the Next.js build
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import {
  beerSchema,
  venueSchema,
  teamMemberSchema,
  aboutPageSchema,
} from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production'

export default defineConfig({
  name: 'dorst-studio',
  title: 'Dorst CMS',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: [beerSchema, venueSchema, teamMemberSchema, aboutPageSchema],
  },
})
