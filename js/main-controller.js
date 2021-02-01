function init() {
    var elPortfolioItemWrapper = document.querySelector(
        '.portfolio-item-wrapper',
    );
    //we append into body after footer all modals
    var elFooter = document.querySelector('footer');

    getGprojs().forEach(function (project) {
        elPortfolioItemWrapper.innerHTML += renderPortfolioItem(project);
        elFooter.insertAdjacentHTML('afterend', renderModal(project));
    });

    //enable and use jquery validation form

    $('.contact-me-form').validate({
        errorElement: 'div',
        // initialize the plugin
        rules: {
            email: {
                required: true,
                email: true,
            },
            subject: {
                required: true,
                minlength: 5,
            },
            text: {
                required: true,
                minlength: 20,
            },
        },
    });
}

//render portfolio-item element
function renderPortfolioItem(project) {
    var strHTML = /*html*/ `
    <div class="col-md-4 col-sm-6 portfolio-item">
					<a class="portfolio-link" data-toggle="modal" href="#portfolioModal_${project.id}">
						<div class="portfolio-hover">
							<div class="portfolio-hover-content">
								<i class="fa fa-plus fa-3x"></i>
							</div>
						</div>
						<img class="img-fluid" src="img/portfolio/${project.imgUrlThumbnail}-thumbnail.jpg" alt="${project.imgUrlThumbnail}">
					</a>
					<div class="portfolio-caption">
						<h4>${project.name}</h4>
						<p class="text-muted">${project.title}</p>
					</div>
                </div>`;

    return strHTML;
}

//render modal
//TODO:onclick render modal arg=proj.id
function renderModal(project) {
    // var project = findProject(pId)
    var strFormattedDate = formatDate(project.publishedAt);
    var elCategories = project.labels
        .map(function (label) {
            return /*html*/ `<span class="badge badge-secondary">${label}</span>`;
        })
        .join('&nbsp;');

    var strHTML = /*html*/ `
	<div class="portfolio-modal modal fade" id="portfolioModal_${project.id}" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="close-modal" data-dismiss="modal">
					<div class="lr">
						<div class="rl"></div>
					</div>
				</div>
				<div class="container">
					<div class="row">
						<div class="col-lg-8 mx-auto">
							<div class="modal-body">
								<!-- Project Details Go Here -->
								<h2>${project.name}</h2>
								<p class="item-intro text-muted">${project.title}</p>
								<img class="img-fluid d-block mx-auto" src="img/portfolio/${project.imgUrlFull}-full.jpg" alt="${project.imgUrlFull}">
								<p>${project.desc}</p>
								<ul class="list-inline">
									<li>Date: ${strFormattedDate}</li>
									<li>Client: ${project.name}</li>
									<li>Category: ${elCategories}</li>
								</ul>
								<button class="btn btn-primary" data-dismiss="modal" type="button">
									<i class="fa fa-times"></i>
									Close Project</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `;

    return strHTML;
}

$('.contact-me-form').on('submit', function (event) {
    event.preventDefault();
    var errorFlag = false;
    var formData = $(this)
        .serializeArray()
        .reduce(function (acc, input) {
            acc[input.name] = input.value;
            if (input.value === '') errorFlag = true;
            return acc;
        }, {});

    if (errorFlag) return;

    var urlRedirect = `https://mail.google.com/mail/?view=cm&fs=1&to=${formData.email}&su=${formData.subject}&body=${formData.text}`;
    window.location.replace(urlRedirect);
});

//toggle "contact me" aside element
function openCanvas() {
    document
        .querySelector('.offcanvas-btn')
        .classList.toggle('offcanvas-btn-open');
    document
        .querySelector('.offcanvas-aside')
        .classList.toggle('offcanvas-aside-open');
}
