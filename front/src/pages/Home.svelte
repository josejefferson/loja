<script>
  import { Row, Container, Alert, Button } from 'sveltestrap'
  import axios from '../lib/api'
  import Product from '../components/Product.svelte'
  import ProductPlaceholder from '../components/ProductPlaceholder.svelte'

  let promise
  function fetchData() {
    promise = axios.get('/products')
  }

  fetchData()
</script>

<div class="bg-light py-5 mb-5">
  <Container>
    <h1 class="display-4">Bem-vindo(a)!</h1>
  </Container>
</div>

<Container>
  {#await promise}
    <Row>
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
      <ProductPlaceholder />
    </Row>
  {:then {data}}
    <Row>
      {#each data as product (product._id)}
        <Product {product} />
      {/each}
    </Row>
  {:catch err}
    <div class="alert alert-danger py-4">
      <Container>
        <h1 class="display-6">Ocorreu um erro!</h1>
        <p>Desculpe-nos! Ocorreu um erro ao carregar os produtos, por favor, tente novamente.</p>
        <Button outline color="danger" on:click={fetchData}>Tentar novamente</Button>
      </Container>
    </div>
  {/await}
</Container>