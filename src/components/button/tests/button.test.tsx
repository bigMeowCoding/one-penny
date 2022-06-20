import { Button } from 'one-penny'
import { testA11y, render } from 'one-penny/src/tests/testing'
import React from 'react'
const classPrefix = `op-button`

describe('Button', function () {
  test('a11y', async () => {
    await testA11y(<Button>test</Button>)
  })
  test('render with color', () => {
    const { getByText } = render(
      <>
        <Button color={'primary'}>Primary</Button>
      </>
    )
    expect(getByText('Primary')).toHaveClass(`${classPrefix}-primary`)
  })
})
