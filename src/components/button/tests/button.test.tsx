import { Button } from 'one-penny'
import { testA11y } from 'one-penny/src/tests/testing'
import React from 'react'

describe('Button', function () {
  test('a11y', async () => {
    await testA11y(<Button>test</Button>)
  })
})
