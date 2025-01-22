document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.custom-form form');
    const inputs = form.querySelectorAll('.custom-input[required]');
    const errorMessages = form.querySelectorAll('.error-message');
    const phoneInput = form.querySelector('input[name="phone"]');
    const successMessage = document.createElement('div');

    // Применение маски к полю телефона с использованием Cleave.js
    const cleavePhone = new Cleave(phoneInput, {
        delimiters: ['(', ') ', '-', '-'],
        blocks: [2, 3, 3, 2, 2],
        prefix: '+7',
        numericOnly: true,
        noImmediatePrefix: false,
    });

    phoneInput.setAttribute('maxlength', '16');

    phoneInput.addEventListener('input', function () {
        const rawValue = cleavePhone.getRawValue();
        const maxLength = 11;
        if (rawValue.length > maxLength) {
            phoneInput.value = cleavePhone.getFormattedValue();
        }
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        let isValid = true;

        inputs.forEach((input, index) => {
            const errorMessage = errorMessages[index];

            if (!input.value.trim()) {
                errorMessage.style.display = 'block';
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Введите корректный E-mail';
                isValid = false;
            } else if (input.name === 'phone' && !validatePhone(phoneInput.value)) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Введите корректный номер телефона';
                isValid = false;
            } else {
                errorMessage.style.display = 'none';
            }
        });

        if (isValid) {
            try {
                // Здесь можно вставить реальный запрос на сервер
                await fakeSubmit();
                showSuccessMessage();
                form.reset();
            } catch (error) {
                console.error('Ошибка отправки формы:', error);
            }
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const rawPhone = cleavePhone.getRawValue();
        const phoneRegex = /^\+7\d{10}$/;
        return phoneRegex.test(rawPhone);
    }

    function showSuccessMessage() {
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <div class="success-message-content">
                <img src="images/succes.png" alt="Checkmark" />
                <p>Ваша заявка успешно отправлена!</p>
            </div>
        `;
        document.body.appendChild(successMessage);

        setTimeout(function () {
            successMessage.style.opacity = '0';
            setTimeout(function () {
                successMessage.remove();
            }, 500);
        }, 3000);
    }

    async function fakeSubmit() {
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }
});
