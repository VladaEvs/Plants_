const plantsData = {
    'monstera': {
        title: 'Монстера',
        image: 'images/monstera.webp',
        description: `
            <p><strong>Монстера деликатесная</strong> — крупное тропическое растение семейства Ароидные, известное своими резными листьями.</p>
            <h3>Особенности ухода:</h3>
            <ul>
                <li><strong>Освещение:</strong> Яркий рассеянный свет, избегать прямых солнечных лучей</li>
                <li><strong>Полив:</strong> Умеренный, между поливами давать почве просохнуть</li>
                <li><strong>Влажность:</strong> Высокая, рекомендуется регулярное опрыскивание</li>
                <li><strong>Температура:</strong> 18-25°C, не ниже 16°C зимой</li>
                <li><strong>Почва:</strong> Легкая, питательная, хорошо дренированная</li>
            </ul>
            <p>Монстera отлично очищает воздух и создает тропическую атмосферу в помещении.</p>
        `
    },
    'sansevieria': {
        title: 'Сансевиерия',
        image: 'images/sansevieria.webp',
        description: `
            <p><strong>Сансевиерия</strong> (Тещин язык) — одно из самых выносливых комнатных растений, идеально подходит для начинающих.</p>
            <h3>Особенности ухода:</h3>
            <ul>
                <li><strong>Освещение:</strong> От тени до яркого света, переносит прямые лучи</li>
                <li><strong>Полив:</strong> Очень умеренный, устойчива к засухе</li>
                <li><strong>Влажность:</strong> Не требовательна, переносит сухой воздух</li>
                <li><strong>Температура:</strong> 15-28°C, выдерживает кратковременные понижения до 10°C</li>
                <li><strong>Почва:</strong> Легкая, песчаная, с хорошим дренажом</li>
            </ul>
            <p>Сансевиерия активно очищает воздух от формальдегида и других вредных веществ.</p>
        `
    },
    'orchid': {
        title: 'Орхидея Фаленопсис',
        image: 'images/orchid.jpg',
        description: `
            <p><strong>Орхидея Фаленопсис</strong> — элегантное эпифитное растение с продолжительным цветением.</p>
            <h3>Особенности ухода:</h3>
            <ul>
                <li><strong>Освещение:</strong> Яркий рассеянный свет, восточные или западные окна</li>
                <li><strong>Полив:</strong> Методом погружения, 1 раз в 7-10 дней</li>
                <li><strong>Влажность:</strong> Высокая, 60-80%, обязательное опрыскивание</li>
                <li><strong>Температура:</strong> 18-25°C, перепад день/ночь стимулирует цветение</li>
                <li><strong>Почва:</strong> Специальный субстрат для орхидей (кора, мох)</li>
            </ul>
            <p>Цветение может продолжаться до 6 месяцев при правильном уходе.</p>
        `
    },
    'ficus': {
        title: 'Фикус Бенджамина',
        image: 'images/ficus.webp',
        description: `
            <p><strong>Фикус Бенджамина</strong> — популярное декоративно-лиственное дерево с густой кроной.</p>
            <h3>Особенности ухода:</h3>
            <ul>
                <li><strong>Освещение:</strong> Яркий рассеянный свет, не переносит прямого солнца</li>
                <li><strong>Полив:</strong> Регулярный, но умеренный, не допускать переувлажнения</li>
                <li><strong>Влажность:</strong> Средняя, полезно опрыскивание в отопительный сезон</li>
                <li><strong>Температура:</strong> 18-24°C, боится сквозняков и резких перепадов</li>
                <li><strong>Почва:</strong> Питательная, нейтральная или слабокислая</li>
            </ul>
            <p>Не любит частых перестановок — может сбросить листья.</p>
        `
    }
};

function openPlantModal(plantId) {
    const plant = plantsData[plantId];
    if (!plant) return;
    
    document.getElementById('modalTitle').textContent = plant.title;
    document.getElementById('modalImage').src = plant.image;
    document.getElementById('modalImage').alt = plant.title;
    document.getElementById('modalDescription').innerHTML = plant.description;
    
    document.getElementById('plantModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePlantModal() {
    document.getElementById('plantModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePlantModal);
    }
    
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('plantModal');
        if (event.target === modal) {
            closePlantModal();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePlantModal();
        }
    });
});