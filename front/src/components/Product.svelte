<script>
	import { Link } from 'svelte-navigator'
	import { Col, CardBody, CardText } from 'sveltestrap'
	import { money } from '../lib/money'
	
	export let product
	
	function faRating(stars) {
		return product.rating.average >= stars ? 'fas' : 'far'
	}

	function imageError() {
		this.classList.add('store-product-image-error')
	}
</script>

<Col md=4 lg=3 class="store-product px-1 py-1">
	<Link to="/products/view/{product._id}" class="card shadow text-decoration-none text-dark h-100">
		{#if product.badge}
			<div class="store-product-badge position-absolute top-0 end-0 bg-danger text-white p-1">{product.badge}</div>
		{/if}

		{#if product.image?.type && product.image?.value}
			{@const imageURL = (product.image.type === 'image.id' ? '/images/view/' : '') + product.image?.value}
			<div class="ratio ratio-16x9 overflow-hidden">
				<img src={imageURL} alt={product.image?.alt} on:error={imageError} class="store-product-image card-img-top">
			</div>
		{:else}
			<div class="ratio ratio-16x9 bg-light">
				<div class="d-flex align-items-center justify-content-center text-secondary">
					<i class="fas fa-5x fa-shopping-basket"></i>
				</div>
			</div>
		{/if}
		
		<CardBody class="d-flex flex-column">
			<h5 class="card-title">
				{#if product.hidden}<i class="fas fa-eye-slash"></i>{/if}
				{product.name}
			</h5>
			
			<CardText>
				<div>
					<i class="{faRating(1)} fa-xs fa-star w-auto text-warning"></i>
					<i class="{faRating(2)} fa-xs fa-star w-auto text-warning"></i>
					<i class="{faRating(3)} fa-xs fa-star w-auto text-warning"></i>
					<i class="{faRating(4)} fa-xs fa-star w-auto text-warning"></i>
					<i class="{faRating(5)} fa-xs fa-star w-auto text-warning"></i>
					<small><small class="fs-8">({product.rating?.totalUsers || 0})</small></small>
				</div>
				<div class="mt-2">
					{#if product.oldpriceStr}
						<s class="d-block fs-6 text-secondary">
							<small>{money(product.oldprice)}</small>
						</s>
					{/if}
					<div><b class="fs-5">{money(product.price)}</b></div>
					<small>
						{#if product.stock}
							{(product.stock >= 0) ? `(${product.stock} unid. dispon.)` : '(disponível)'}
						{:else}
							<span class="text-danger">(esgotado)</span>
						{/if}
					</small>
				</div>
			</CardText>
		</CardBody>
	</Link>
</Col>

<style>
	:global(.store-product) {
		transition: transform .2s ease;
	}

	:global(.store-product) .store-product-image {
		transition: transform .2s ease;
		object-fit: cover;
	}

	:global(.store-product):hover .store-product-image {
		transform: scale(1.1);
	}

	:global(.store-product) .store-product-image-error {
		/*TODO*/
	}

	:global(.store-product):active {
		transform: scale(0.9);
	}

	:global(.store-product) .store-product-badge {
		border-radius: 0 3px 0 10px;
		text-transform: uppercase;
		z-index: 1;
	}
</style>