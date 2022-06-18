import {
  act,
  fireEvent,
  render,
  RenderOptions,
  RenderResult,
} from '@testing-library/react'
import { toHaveNoViolations, axe } from 'jest-axe'
import type { RunOptions } from 'axe-core'
import React from 'react'
expect.extend(toHaveNoViolations)
type UI = Parameters<typeof render>[0]
const AllTheProviders = ({ children }: { children: React.ReactElement }) => {
  return children
}

export interface TestOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: typeof AllTheProviders
}
type TestA11YOptions = TestOptions & { axeOptions?: RunOptions }
export const customRender = (
  ui: UI,
  { wrapper: Wrapper = AllTheProviders, ...options }: TestOptions = {}
): RenderResult => render(<Wrapper>{ui}</Wrapper>, options)
export const testA11y = async (
  ui: UI | Element,
  { axeOptions, ...options }: TestA11YOptions = {}
) => {
  const container = React.isValidElement(ui)
    ? customRender(ui, options).container
    : ui
  const results = await axe(container, axeOptions as any)
  expect(results).toHaveNoViolations()
}
export { customRender as render }
