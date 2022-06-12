<script>
  import { Router, Route } from 'svelte-navigator'
  import Home from './pages/Home.svelte'
  import Product from './pages/Product.svelte'
</script>

<Router>
  <main>
    <Route primary={false} path="/">
      <Home />
    </Route>

    <Route primary={false} path="/products/view/:id" let:params>
      <Product id={params.id} />
    </Route>

    <Route primary={false} path="">
      <h1>404 Not Found</h1>
    </Route>
  </main>
</Router>
