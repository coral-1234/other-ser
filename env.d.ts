import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    action?: string
    subject?: string
    fields?: string[]
    conditions?: Record<string, any>
    layoutWrapperClasses?: string
    navActiveLink?: RouteLocationRaw
    layout?: 'blank' | 'default'
    unauthenticatedOnly?: boolean
    public?: boolean
  }
}
