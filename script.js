$(document).ready(function() {
    // Create the alert div but hide it initially
    const alertHtml = `
        <div id="soldOutAlert" class="alert alert-danger alert-dismissible fade" role="alert"
            style="
                display: none;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1050;
                width: 80%;
                max-width: 600px;
                padding: 2rem;
                font-size: 1.25rem;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            ">
            <strong style="font-size: 1.5rem;">Oh no... Sono finiti i biglietti! 😢</strong>
            <p style="margin-top: 1rem;">Gli ultimi 2 biglietti sono stati acquistati <span id="secondsCounter">4</span> secondi fa dall'utente:</p>
            <p>Cedrini A.</p>
            <button type="button" id="close-popup" class="btn btn-primary" aria-label="Close">Peccato...</button>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"
                style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    font-size: 1.5rem;
                ">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;


    // Add the CSS animation for the progress bar
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        @keyframes countdown {
            from {
                width: 100%;
            }
            to {
                width: 0%;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Add just the alert to the body initially
    $('body').append(alertHtml);

    let counterInterval;
    let alertShown = false;

    function showVideo() {
        window.open('micronics_ads.html', '_blank', 'width=800,height=600');
    }

    // Handle button click
    $('#buyButton').click(function() {
        if (alertShown) {
            showVideo();
        } else {
            showAlert();
            alertShown = true;
        }
    });

    function replaceWithSoldOut() {
        const buyButton = $('#buyButton');
        buyButton.text('Sold Out');
        buyButton.prop('disabled', true);
        buyButton.css('background-color', '#6c757d');
        buyButton.css('border-color', '#6c757d');

        const warning = $('#ticketsLeft');
        warning.text('Biglietti finiti...');
        warning.removeClass('alert-warning');
        warning.addClass('alert-error');
    }

    function showAlert() {
        replaceWithSoldOut();
        const alert = $('#soldOutAlert');
        let seconds = 4;

        if (counterInterval) {
            clearInterval(counterInterval);
        }

        alert.css('display', 'block');
        setTimeout(() => {
            alert.addClass('show');
        }, 10);

        counterInterval = setInterval(() => {
            seconds++;
            $('#secondsCounter').text(seconds);
        }, 1000);

        const onPopupClose = () => {
            alert.removeClass('show');
            alert.css('display', 'none');
            showVideo();
            clearInterval(counterInterval);
        }

        $('#close-popup').click(onPopupClose);
    }



});