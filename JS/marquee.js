document.addEventListener('DOMContentLoaded', function () {
    function duplicateElements(selector) {
      const container = document.querySelector(selector);
      const items = Array.from(container.children);
      
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
      });
    }

    duplicateElements('.left-to-right');
    duplicateElements('.right-to-left');
  });