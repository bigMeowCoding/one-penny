declare module '*.less' {
  const value: {
    [key: string]: string
  }
  export = value
}

declare module '*.svg' {
  const content: any
  export default content
}
declare module 'css-animation*'
declare module '*.png' {
  const content: any
  export default content
}
declare module '!!raw-loader!*' {
  const contents: string
  export default content
}
