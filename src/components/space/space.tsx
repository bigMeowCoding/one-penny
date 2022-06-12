import React, { FC } from 'react'
import { mergeProps } from 'one-penny/es/utils/with-default-props'
import { NativeProps, withNativeProps } from 'one-penny/es/utils/native-props'
import classNames from 'classnames'
export type SpaceProps = {
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'end' | 'center' | 'baseline'
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch'
  wrap?: boolean
  block?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: React.ReactNode
} & NativeProps<'--gap' | '--gap-vertical' | '--gap-horizontal'>
const defaultProps = {
  direction: 'horizontal',
}
const classPrefix = `op-space`

const Space: FC<SpaceProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { direction, onClick } = props
  return withNativeProps(
    props,
    <div
      className={classNames(classPrefix, {
        [`${classPrefix}-wrap`]: props.wrap,
        [`${classPrefix}-block`]: props.block,
        [`${classPrefix}-${direction}`]: true,
        [`${classPrefix}-align-${props.align}`]: !!props.align,
        [`${classPrefix}-justify-${props.justify}`]: !!props.justify,
      })}
      onClick={onClick}
    >
      {React.Children.map(props.children, children => {
        return (
          children !== null &&
          children !== undefined && (
            <div className={`${classPrefix}-item`}>{children}</div>
          )
        )
      })}
    </div>
  )
}
export default Space
