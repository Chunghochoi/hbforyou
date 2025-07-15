document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const initialScreen = document.getElementById('initialScreen');
    const happyBirthdayText = document.querySelector('.happy-birthday-text');
    const cake = document.querySelector('.cake');
    const popperLeft = document.querySelector('.popper-left');
    const popperRight = document.querySelector('.popper-right');
    const confettiContainer = document.getElementById('confettiContainer');
    const textOverlay1 = document.getElementById('textOverlay1');
    const textOverlay2 = document.getElementById('textOverlay2');
    const envelopeIcon = document.getElementById('envelopeIcon');

    const nameInputPopup = document.getElementById('nameInputPopup');
    const userNameInput = document.getElementById('userNameInput');
    const confirmNameBtn = document.getElementById('confirmNameBtn');
    const mainContent = document.getElementById('mainContent');

    const mainHappyBirthdayText = document.querySelector('.main-happy-birthday-text');
    const partyHat = document.querySelector('.party-hat');
    const dateInfo = document.querySelector('.date-info');
    const emojiSmile = document.querySelector('.emoji-smile');
    const balloonPink1 = document.querySelector('.balloon-pink-main-1');
    const balloonPink2 = document.querySelector('.balloon-pink-main-2');
    const profileContainer = document.querySelector('.profile-container');
    const tidiName = document.querySelector('.tidi-name');
    const statusMessage = document.getElementById('statusMessage');
    const messageIcon = document.getElementById('messageIcon');

    const messagePopup = document.getElementById('messagePopup');
    const closeMessagePopup = document.getElementById('closeMessagePopup');
    const recipientNameSpan = document.getElementById('recipientName');
    const messageRecipientNameSpan = document.getElementById('messageRecipientName');


    const confettiColors = ['#f06292', '#ffab91', '#c5e1a5', '#a7d9ef', '#ffccbc', '#b39ddb']; // Thêm màu cho đa dạng

    // Hàm tạo confetti
    function createConfetti(count = 50, isExplosion = false, startX = 50, startY = 50) {
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];

            if (isExplosion) {
                // Hiệu ứng nổ từ một điểm
                const angle = Math.random() * 2 * Math.PI;
                const velocity = Math.random() * 200 + 100; // Tốc độ ban đầu
                const initialX = startX + (Math.random() - 0.5) * 20; // Thêm độ lệch nhỏ
                const initialY = startY + (Math.random() - 0.5) * 20;

                confetti.style.left = `${initialX}px`;
                confetti.style.top = `${initialY}px`;
                confetti.style.opacity = 1;
                confetti.style.width = `${Math.random() * 8 + 4}px`; // Kích thước ngẫu nhiên
                confetti.style.height = `${Math.random() * 8 + 4}px`;

                const animationDuration = Math.random() * 1.5 + 1; // 1 đến 2.5 giây
                const translateX = Math.cos(angle) * velocity;
                const translateY = Math.sin(angle) * velocity + 200; // Thêm trọng lực

                confetti.style.animation = `confetti-explode ${animationDuration}s forwards ease-out`;
                confetti.style.setProperty('--tx', `${translateX}px`);
                confetti.style.setProperty('--ty', `${translateY}px`);

                // Định nghĩa keyframes cho confetti-explode trong JS
                const styleSheet = document.styleSheets[0];
                const keyframes = `@keyframes confetti-explode {
                    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
                    100% { transform: translate(var(--tx), var(--ty)) rotate(720deg); opacity: 0; }
                }`;
                if (![...styleSheet.cssRules].some(rule => rule.name === 'confetti-explode')) {
                    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
                }

            } else {
                // Hiệu ứng rơi từ trên xuống
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.opacity = 0;
                confetti.style.width = `${Math.random() * 10 + 5}px`;
                confetti.style.height = `${Math.random() * 10 + 5}px`;
                confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s ease-out forwards ${Math.random() * 0.5}s`;
            }

            confettiContainer.appendChild(confetti);

            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    // Hàm hiệu ứng gõ chữ
    function typeWriter(element, text, delay = 100) {
        return new Promise(resolve => {
            let i = 0;
            element.classList.add('typing-active'); // Thêm class để bật con trỏ
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, delay);
                } else {
                    element.classList.remove('typing-active');
                    element.classList.add('typed'); // Đánh dấu đã gõ xong
                    resolve();
                }
            }
            type();
        });
    }

    // --- Trình tự animation màn hình chào mừng ---
    async function startIntroAnimation() {
        // Đặt màn hình chào mừng là active
        initialScreen.classList.add('active');

        // Phát nhạc
        backgroundMusic.play().catch(e => console.log("Music play blocked:", e)); // Xử lý lỗi trình duyệt chặn tự động phát

        // Animation Happy Birthday text
        await new Promise(resolve => {
            happyBirthdayText.addEventListener('animationend', resolve, { once: true });
            happyBirthdayText.style.animation = 'popInText 1s forwards 1s'; // Kích hoạt animation đã định nghĩa trong CSS
        });

        // Animation Cake slide up
        await new Promise(resolve => {
            cake.addEventListener('animationend', resolve, { once: true });
            cake.style.animation = 'slideUpCake 1s forwards 2.5s';
        });

        // Confetti from poppers
        // Vị trí poppers: giả sử giữa popperLeft/Right và trung tâm màn hình
        const cardRect = birthdayCard.getBoundingClientRect();
        const popperLeftRect = popperLeft.getBoundingClientRect();
        const popperRightRect = popperRight.getBoundingClientRect();

        const popperLeftX = popperLeftRect.left + popperLeftRect.width / 2;
        const popperLeftY = popperLeftRect.top + popperLeftRect.height / 2;

        const popperRightX = popperRightRect.left + popperRightRect.width / 2;
        const popperRightY = popperRightRect.top + popperRightRect.height / 2;

        await new Promise(resolve => {
            popperLeft.style.animation = 'fadeInPopper 0.5s forwards 3.5s';
            popperRight.style.animation = 'fadeInPopper 0.5s forwards 3.5s';
            setTimeout(() => {
                createConfetti(100, true, popperLeftX, popperLeftY); // Tạo confetti nổ từ vị trí popper
                createConfetti(100, true, popperRightX, popperRightY);
                createConfetti(50); // Thêm confetti rơi từ trên xuống
                resolve();
            }, 3500); // Kích hoạt sau 3.5 giây
        });


        // Typing effect for text overlays
        const text1Content = "Ngoan nghe chưa";
        const text2Content = "Sinh nhật vui vẻ!";
        textOverlay1.textContent = ''; // Xóa nội dung ban đầu
        textOverlay2.textContent = '';

        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay giữa các animation chính và hiệu ứng chữ

        textOverlay1.style.opacity = 1; // Làm cho phần tử hiển thị trước khi gõ
        await typeWriter(textOverlay1, text1Content, 100); // Tốc độ gõ 100ms/ký tự

        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay giữa 2 câu
        textOverlay2.style.opacity = 1;
        await typeWriter(textOverlay2, text2Content, 100);

        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay sau câu cuối
        textOverlay1.style.opacity = 0; // Làm mờ chữ
        textOverlay2.style.opacity = 0;


        // Show envelope icon
        await new Promise(resolve => {
            envelopeIcon.addEventListener('animationend', resolve, { once: true });
            envelopeIcon.style.animation = 'fadeInScale 0.8s forwards 0s'; // Không delay thêm nữa, đã có delay tổng
        });
    }

    // --- Chuyển sang màn hình nhập tên ---
    envelopeIcon.addEventListener('click', () => {
        initialScreen.classList.remove('active');
        nameInputPopup.classList.add('active');
    });

    // --- Chuyển sang màn hình chính ---
    confirmNameBtn.addEventListener('click', async () => {
        const userName = userNameInput.value.trim();
        if (userName) {
            nameInputPopup.classList.remove('active');
            mainContent.classList.add('active');

            // Cập nhật tên người nhận trong popup tin nhắn
            recipientNameSpan.textContent = userName;
            messageRecipientNameSpan.textContent = userName;

            // --- Trình tự animation màn hình chính ---
            // Animation Happy Birthday text
            await new Promise(resolve => {
                mainHappyBirthdayText.addEventListener('animationend', resolve, { once: true });
                mainHappyBirthdayText.style.animation = 'scaleIn 1s forwards';
            });

            // Position party hat dynamically
            // Lấy vị trí của chữ "Birthday" trong .main-happy-birthday-text
            const happyBirthdayRect = mainHappyBirthdayText.getBoundingClientRect();
            const hatTop = happyBirthdayRect.top - partyHat.offsetHeight / 2; // Khoảng trên chữ
            const hatLeft = happyBirthdayRect.left + happyBirthdayRect.width * 0.6; // Khoảng 60% chiều rộng chữ "Birthday"

            partyHat.style.top = `${hatTop}px`;
            partyHat.style.left = `${hatLeft}px`;

            await new Promise(resolve => {
                partyHat.addEventListener('animationend', resolve, { once: true });
                partyHat.style.animation = 'fadeInSlideRight 1s forwards';
            });

            // Date info
            await new Promise(resolve => {
                dateInfo.addEventListener('animationend', resolve, { once: true });
                dateInfo.style.animation = 'slideUpFadeIn 1s forwards 0.5s';
            });

            // Emoji smile
            await new Promise(resolve => {
                emojiSmile.addEventListener('animationend', resolve, { once: true });
                emojiSmile.style.animation = 'scaleIn 1s forwards 0.5s'; // Sau đó mới đến bounce
                setTimeout(() => {
                    emojiSmile.style.animation = 'bounce 1s infinite alternate';
                }, 1500); // Bắt đầu bounce sau khi scaleIn hoàn tất
            });


            // Balloons slide up
            await new Promise(resolve => {
                balloonPink1.addEventListener('animationend', resolve, { once: true });
                balloonPink1.style.animation = 'slideUpBalloon 1.5s forwards 0s'; // Delay đã được xử lý bằng setTimeout bên dưới
                balloonPink2.style.animation = 'slideUpBalloon 1.5s forwards 0.5s';
            });

            // Profile picture zoom in
            await new Promise(resolve => {
                profileContainer.addEventListener('animationend', resolve, { once: true });
                profileContainer.style.animation = 'zoomIn 1s forwards 1s';
            });

            // Tidi name slide up fade in
            await new Promise(resolve => {
                tidiName.addEventListener('animationend', resolve, { once: true });
                tidiName.style.animation = 'slideUpFadeIn 1s forwards 1.5s';
            });

            // Status message typing effect
            const statusMsgContent = "Đã nghiện còn ngại!))) 🫶";
            statusMessage.textContent = ''; // Xóa nội dung ban đầu
            await new Promise(resolve => setTimeout(resolve, 2000)); // Delay để khớp thời gian video
            statusMessage.style.opacity = 1;
            await typeWriter(statusMessage, statusMsgContent, 80);

            // Message icon pulse
            await new Promise(resolve => {
                messageIcon.addEventListener('animationend', resolve, { once: true });
                messageIcon.style.animation = 'pulse 1.5s infinite, fadeIn 0.5s forwards';
            });

        } else {
            alert('Vui lòng nhập tên của bạn!');
        }
    });

    // Mở popup tin nhắn
    messageIcon.addEventListener('click', () => {
        messagePopup.classList.add('active');
    });

    // Đóng popup tin nhắn
    closeMessagePopup.addEventListener('click', () => {
        messagePopup.classList.remove('active');
    });

    // Tắt nhạc khi rời trang (tùy chọn)
    window.addEventListener('beforeunload', () => {
        backgroundMusic.pause();
    });


    // Bắt đầu chuỗi animation khi trang tải xong
    startIntroAnimation();
});