document.addEventListener('DOMContentLoaded', function() {
    const inputString = document.getElementById('inputString');
    const parseButton = document.getElementById('parseButton');
    const area1 = document.getElementById('area1');
    const area2 = document.getElementById('area2');
    const area3 = document.getElementById('area3');
    let allWords = []; 
    let elementColors = new Map();
    parseButton.addEventListener('click', function() {
        area2.innerHTML = '';
        area3.innerHTML = '';
        area1.innerHTML = '<span class="placeholder-text"></span>';
        allWords = [];
        elementColors.clear();
        const inputValue = inputString.value.trim();
        const items = inputValue.split('-').map(item => item.trim()).filter(item => item !== '');
        const lowercaseWords = [];
        const uppercaseWords = [];
        const numbers = [];
        items.forEach(item => {
            if (!isNaN(item) && item.trim() !== '') {
                numbers.push(parseInt(item));
            } else {
                if (item.charAt(0) === item.charAt(0).toUpperCase() && item.charAt(0) !== item.charAt(0).toLowerCase()) {
                    uppercaseWords.push(item);
                } else {
                    lowercaseWords.push(item);
                }
            }
        });
        
        lowercaseWords.sort();
        uppercaseWords.sort();
        numbers.sort((a, b) => a - b);
        lowercaseWords.forEach((word, index) => {
            const key = `a${index + 1}`;
            createWordElement(word, key, 'lowercase');
        });
        uppercaseWords.forEach((word, index) => {
            const key = `b${index + 1}`;
            createWordElement(word, key, 'uppercase');
        });
        numbers.forEach((number, index) => {
            const key = `n${index + 1}`;
            createWordElement(number.toString(), key, 'number');
        });
        allWords.forEach(element => {
            area3.appendChild(element);
        });
        sortArea3();
    });
    
    function createWordElement(text, key, type) {
        const element = document.createElement('div');
        element.className = 'word-item';
        const keySpan = document.createElement('span');
        keySpan.className = 'word-key';
        keySpan.textContent = key + ': ';
        keySpan.style.fontWeight = 'bold';
        keySpan.style.marginRight = '5px';
        const textSpan = document.createElement('span');
        textSpan.className = 'word-text';
        textSpan.textContent = text;
        element.appendChild(keySpan);
        element.appendChild(textSpan);
        element.dataset.key = key;
        element.dataset.type = type;
        element.dataset.text = text;
        element.style.backgroundColor = 'transparent';
        element.style.border = '2px solid #cccccc';
        element.style.color = '#333333';
        element.draggable = true;
        element.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.dataset.key);
            e.target.classList.add('dragging');
            setTimeout(() => {
                e.target.style.opacity = '0.4';
            }, 0);
        });
        element.addEventListener('dragend', function(e) {
            e.target.classList.remove('dragging');
            e.target.style.opacity = '1';
        });
        element.addEventListener('click', function() {
            if (this.parentElement === area2) {
                addWordToArea1(this.dataset.text, this.style.backgroundColor);
            }
        });
        allWords.push(element);
        return element;
    }
    
    function addWordToArea1(text, color) {
        const placeholder = area1.querySelector('.placeholder-text');
        if (placeholder) {
            area1.removeChild(placeholder);
        }
        const wordSpan = document.createElement('span');
        wordSpan.className = 'area1-word';
        wordSpan.textContent = text;
        wordSpan.style.color = color;
        wordSpan.style.margin = '5px 10px';
        wordSpan.style.fontSize = '18px';
        wordSpan.style.fontWeight = 'bold';
        wordSpan.style.display = 'inline-block';
        area1.appendChild(wordSpan);
    }
    
    function sortArea3() {
        const elementsInArea3 = Array.from(area3.children);
        elementsInArea3.sort((a, b) => {
            const keyA = a.dataset.key;
            const keyB = b.dataset.key;
            const typeA = keyA.charAt(0);
            const typeB = keyB.charAt(0);
            if (typeA !== typeB) {
                return typeA.localeCompare(typeB);
            }
            const numA = parseInt(keyA.slice(1));
            const numB = parseInt(keyB.slice(1));
            return numA - numB;
        });
        
        area3.innerHTML = '';
        elementsInArea3.forEach(element => {
            area3.appendChild(element);
            element.style.backgroundColor = 'transparent';
            element.style.border = '2px solid #cccccc';
            element.style.color = '#333333';
        });
    }
    
    area2.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const draggingElement = document.querySelector('.dragging');
        if (!draggingElement) return;
        if (draggingElement.parentElement === area2) {
            const afterElement = getDragAfterElement(area2, e.clientY);
            if (afterElement) {
                area2.insertBefore(draggingElement, afterElement);
            } else {
                area2.appendChild(draggingElement);
            }
        }
    });
    
    area2.addEventListener('drop', function(e) {
        e.preventDefault();
        const key = e.dataTransfer.getData('text/plain');
        const element = document.querySelector(`[data-key="${key}"]`);
        if (!element) return;
        if (element.parentElement === area3) {
            if (!elementColors.has(element)) {
                const randomColor = getRandomColor();
                elementColors.set(element, randomColor);
            }
            const color = elementColors.get(element);
            element.style.backgroundColor = color;
            element.style.border = 'none';
            element.style.color = 'white';
            this.appendChild(element);
        }
    });
    area3.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
    area3.addEventListener('drop', function(e) {
        e.preventDefault();
        const key = e.dataTransfer.getData('text/plain');
        const element = document.querySelector(`[data-key="${key}"]`);
        if (element && element.parentElement === area2) {
            element.remove();
            area3.appendChild(element);
            sortArea3();
        }
    });
    
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.word-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    
    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.floor(Math.random() * 30);
        const lightness = 40 + Math.floor(Math.random() * 30);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
});