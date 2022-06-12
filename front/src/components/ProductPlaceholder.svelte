<script>
	import { Col, CardBody, CardText, Spinner } from 'sveltestrap'
</script>

<Col md=4 lg=3 class="store-product px-1 py-1">
	<div class="  text-decoration-none text-dark h-100">
		<div class="ratio ratio-16x9 bg-light">
			<div class="d-flex align-items-center justify-content-center text-secondary"></div>
		</div>
		
		<CardBody class="d-flex flex-column">
			<h5 class="card-title">
				<div class="placeholder bg-light col-8"></div>
			</h5>
			
			<CardText>
				<div class="placeholder bg-light col-6"></div>
				<div class="placeholder bg-light col-1"></div>

				<div class="mt-2">
					<div><b class="fs-5"><span class="placeholder bg-light col-5"></span></b></div>
					<small>
						<div class="placeholder bg-light col-7"></div>
					</small>
				</div>
			</CardText>
		</CardBody>
	</div>
</Col>