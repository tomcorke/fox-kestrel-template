declare module '*.scss' {
  const content: {[className: string]: string}
  export = content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.svg' {
  const content: string
  const src: string
  export default content
}
