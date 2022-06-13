<script>
	import { Container } from 'sveltestrap'
	import axios from '../../../lib/api'
	import { money } from '../../../lib/money'
	import { browser } from '$app/env'
	import { page } from '$app/stores'

	const id = $page.params.id
	let product
	let cart = []
	let fullURL = browser ? window.location.href : ''

	let promise
  function fetchData() {
    promise = axios.get('/products/' + id).then((res) => {
    	product = res.data
  		product.description = product.description?.replace(/\n/g, '<br>')
    	if (product.image) product.media.unshift(product.image)
    	return product
    })
  }

  fetchData()

  function faRating(stars) {
		return product.rating.average >= stars ? 'fas' : 'far'
	}
</script>

<svelte:head>
	<title>{product?.name || 'Produto'} - Loja</title>
</svelte:head>

{#await promise}
	Loading...
{:then}
	<div class="carousel slide bg-black" id="media" data-bs-ride="carousel" style="max-height:300px">
		<div class="carousel-indicators">
			{#each product.media as media, i}
				<button class:active={i === 0} data-bs-target="#media" data-bs-slide-to={i}></button>
			{/each}
		</div>
		<div class="carousel-inner" style="max-height:300px">
			{#each product.media as media, i}
				<div class="carousel-item	ratio ratio-16x9" class:active={i === 0}>
					{#if media.type === 'image.id' || media.type === 'image.url'}
						{@const imageURL = (product.image?.type === 'image.id' ? '/images/view/' : '') + product.image?.value}
						<img src={imageURL} alt={product.image?.alt} class="d-block w-100" style="object-fit:contain;max-height:300px">
					{:else if media.type === 'youtube'}
						<iframe src="https://www.youtube-nocookie.com/embed/{media.value}?rel=0" title="YouTube Video" frameborder="0" style="max-height:300px"></iframe>
					{/if}
				</div>
			{/each}
		</div>
		<button class="carousel-control-prev" data-bs-target="#media" data-bs-slide="prev">
			<span class="carousel-control-prev-icon"></span>
		</button>
		<button class="carousel-control-next" data-bs-target="#media" data-bs-slide="next">
			<span class="carousel-control-next-icon"></span>
		</button>
	</div>

	<Container class="my-4">
		<h1 class="my-2">
			<span>{product.name}</span>
			<span class="text-danger" hidden={!product.badge}>({product.badge})</span>
		</h1>

		<p>
			<i class="{faRating(1)} fa-xs fa-star w-auto text-warning"></i>
			<i class="{faRating(2)} fa-xs fa-star w-auto text-warning"></i>
			<i class="{faRating(3)} fa-xs fa-star w-auto text-warning"></i>
			<i class="{faRating(4)} fa-xs fa-star w-auto text-warning"></i>
			<i class="{faRating(5)} fa-xs fa-star w-auto text-warning"></i>
			<small><small class="fs-8">{product.rating.average || 0} ({product.rating.totalUsers || 0} avaliações)</small></small>
		</p>

		<p class="fs-4">
			{#if product.oldprice} %>
				<s class="d-block fs-6 text-secondary">
					<small>{money(product.oldprice)}</small>
				</s>
			{/if}
			<b>{money(product.price)}</b>
			<span class="text-danger fs-4" hidden={product.stock}>(esgotado)</span>
		</p>

		<div class="row mb-3">
			<div class="col-12 col-md-6">
				<a href="/requests/buy/{product._id}" class="btn btn-lg btn-warning w-100" disabled={!product.stock}>
					<i class="fas fa-dollar-sign"></i> Comprar
					<span hidden={product.stock <= 0}>({product.stock} em estoque)</span>
				</a>
			</div>
			<div class="col-12 col-md-6">
				<button
					class="btn btn-lg btn-primary w-100 mt-1 mt-md-0"
					hidden={cart.includes(product.id)}
					disabled={!product.stock}
				>
					<i class="fas fa-cart-plus"></i> Carrinho
				</button>
				<button
					class="btn btn-lg btn-danger w-100 mt-1 mt-md-0"
					hidden={!cart.includes(product.id)}
				>
					<i class="fas fa-cart-arrow-down"></i> Carrinho
				</button>
			</div>
		</div>

		<p>{product.description}</p>

		<h3 class="mt-3">Avaliações</h3>
		<table cellpadding="3" class="ratings text-dark">
			<tbody>
				{#each Array(5) as _, i}
					{@const width = (Math.round(product.rating[5 - i] * 100 / product.rating.totalUsers) || 0) + '%'}
					<tr>
						<td>{5 - i} <i class="mdi mdi-star"></i></td>
						<td class="w-100">
							<div class="w-100 bg-light rounded-pill p-0" style="height: 10px;">
								<div class="bg-warning h-100 rounded-pill" style:width></div>
							</div>
						</td>
						<td><i class="mdi mdi-account"></i> {product.rating[5 - i]}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<h3 class="mt-3">Compartilhe</h3>
		<a href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(fullURL)}" target="_blank" class="btn btn-primary">
			<i class="mdi mdi-facebook"></i> Facebook</a>
		<a href="https://wa.me/?text={encodeURIComponent(`${product.name}\n${fullURL}`)}" target="_blank" class="btn btn-success">
			<i class="mdi mdi-whatsapp"></i> WhatsApp</a>
		<a href="https://twitter.com/intent/tweet?url={encodeURIComponent(fullURL)}" target="_blank" class="btn btn-info">
			<i class="mdi mdi-twitter"></i> Twitter</a>
	</Container>
{:catch err}
	Error!
{/await}

<style>
	table.ratings tr td {
		white-space: nowrap;
	}
</style>