// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}
// Function to show content and update button style
function showContent(sectionId, event) {
  // Hide all sections
  const sections = document.querySelectorAll('.w3-container');
  sections.forEach(section => section.classList.add('hidden'));

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.w3-bar-item');
  buttons.forEach(button => button.classList.remove('active'));

  // Show selected section
  document.getElementById(sectionId).classList.remove('hidden');

  const sidebar = document.getElementById("mySidebar");
  sidebar.innerHTML = '';

  if (sectionId === 'courseInfo') {
    sidebar.innerHTML = `
    <h4 class="w3-bar-item"><b>Menu</b></h4>
    <a class="w3-bar-item w3-button w3-hover-black" href="#classInfo">Thông tin khai giảng</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#seminar">Thông tin Seminar</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#company">Thông tin công ty quan tâm</a>
  `;
  } else if (sectionId === 'info') {
    sidebar.innerHTML = `
    <h4 class="w3-bar-item"><b>Thông tin môn học</b></h4>
    <a class="w3-bar-item w3-button w3-hover-black" href="#summaryVN">Mô tả tóm tắt học phần (tiếng Việt) (*)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#summaryEN">Mô tả tóm tắt học phần (tiếng Anh) (*)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#contentVN">Nội dung tóm tắt học phần (tiếng Việt) (*)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#contentEN">Nội dung tóm tắt học phần (tiếng Anh) (*)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#reference">Sách tham khảo</a>

  `;
  } else if (sectionId === 'web-tech') {
    sidebar.innerHTML = `
    <h4 class="w3-bar-item"><b>Công nghệ Web</b></h4>
    <a class="w3-bar-item w3-button w3-hover-black" href="#frontend">1. Frontend (Giao diện người dùng)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#backend">2. Backend (Máy chủ và xử lý dữ liệu)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#database">3. Cơ sở dữ liệu</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#api">4. API và Tích hợp dịch vụ</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#devops">5. DevOps và Triển khai</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#security">6. Bảo mật</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#testing">7. Testing và Debugging</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#optimization">8. Performance Optimization</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#authentication">9. User Authentication & Authorization</a>
  `;
  } else if (sectionId === 'student-info') {
    sidebar.innerHTML = `
    <h4 class="w3-bar-item"><b>Thông tin sinh viên</b></h4>
    <a class="w3-bar-item w3-button w3-hover-black" href="#academic-info">Thông tin học tập</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#skills-info">Kĩ năng</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#projects-info">Dự án</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#hobbies-info">Sở thích</a>
  `;
  }

  // Add active class to clicked button if event exists
  if (event) {
    event.target.classList.add('active');
  }
}
window.onload = function () {
  showContent('courseInfo');
};

// Function to update section name in navbar and local storage
function updateSectionName(oldName, newName) {
  // Get current data from local storage
  const sectionNames = JSON.parse(localStorage.getItem('sectionNames') || '{}');
  const menuItems = JSON.parse(localStorage.getItem('menuItems') || '{}');
  
  // Update storage
  menuItems[newName] = menuItems[oldName] || [];
  delete menuItems[oldName];
  sectionNames[newName] = newName;
  delete sectionNames[oldName];
  
  // Save to local storage
  localStorage.setItem('sectionNames', JSON.stringify(sectionNames));
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
  
  // Update in navbar
  const navbar = document.querySelector('.w3-top .w3-bar');
  const navbarLinks = Array.from(navbar.querySelectorAll('.w3-bar-item'));
  const linkToUpdate = navbarLinks.find(link => link.textContent.trim() === oldName);
  
  if (linkToUpdate) {
    linkToUpdate.textContent = newName;
    linkToUpdate.addEventListener('click', function(event) {
      showContent(newName.toLowerCase().replace(/\s+/g, '-'), event);
    });
  }
  
  // Update section container
  const oldContainer = document.getElementById(oldName.toLowerCase().replace(/\s+/g, '-'));
  if (oldContainer) {
    oldContainer.id = newName.toLowerCase().replace(/\s+/g, '-');
    const header = oldContainer.querySelector('.header');
    if (header) {
      header.textContent = newName;
    }
  }
}

// Function to get default menu items for a section
function getDefaultMenuItems(sectionName) {
  switch(sectionName) {
    case 'Trang chủ':
      return ['Thông tin khai giảng', 'Thông tin semina', 'Công ty quan tâm'];
    case 'Thông tin môn học':
      return ['Thông tin chung', 'Mô tả tóm tắt', 'Nội dung chi tiết', 'Tài liệu tham khảo'];
    case 'Các công nghệ web':
      return ['Frontend', 'Backend', 'Database', 'API', 'DevOps', 'Security', 'Testing'];
    case 'Thông tin sinh viên':
      return ['Thông tin cá nhân', 'Học tập', 'Kỹ năng', 'Dự án', 'Sở thích'];
    default:
      return [];
  }
}

function getMenuItems(sectionName) {
  // First try to get from local storage
  const menuItems = JSON.parse(localStorage.getItem('menuItems') || '{}');
  if (menuItems[sectionName]) {
    return menuItems[sectionName];
  }
  
  // If not in local storage, get default items and store them
  const defaultItems = getDefaultMenuItems(sectionName);
  menuItems[sectionName] = defaultItems;
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
  return defaultItems;
}

// Function to load section names from local storage
function loadSectionNames() {
  const sectionNames = JSON.parse(localStorage.getItem('sectionNames') || '{}');
  const navbarLinks = document.querySelectorAll('.w3-top .w3-bar-item');
  
  navbarLinks.forEach(link => {
    const originalName = link.textContent.trim();
    if (sectionNames[originalName]) {
      link.textContent = sectionNames[originalName];
    }
  });
}

// Function to delete a section and its menu items
function deleteSection(sectionName) {
  // Get current data from local storage
  const sectionNames = JSON.parse(localStorage.getItem('sectionNames') || '{}');
  const menuItems = JSON.parse(localStorage.getItem('menuItems') || '{}');
  
  // Remove section and its menu items
  delete sectionNames[sectionName];
  delete menuItems[sectionName];
  
  // Save updated data to local storage
  localStorage.setItem('sectionNames', JSON.stringify(sectionNames));
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
  
  // Remove from navbar
  const navbar = document.querySelector('.w3-top .w3-bar');
  const navbarLinks = Array.from(navbar.querySelectorAll('.w3-bar-item'));
  const linkToRemove = navbarLinks.find(link => link.textContent.trim() === sectionName);
  
  if (linkToRemove) {
    navbar.removeChild(linkToRemove);
  }
  
  // Remove the section's content container
  const sectionContainer = document.getElementById(sectionName.toLowerCase().replace(/\s+/g, '-'));
  if (sectionContainer) {
    sectionContainer.remove();
  }
  
  // If this was the active section, show the home page
  const activeButton = document.querySelector('.w3-bar-item.active');
  if (activeButton && activeButton.textContent.trim() === sectionName) {
    showContent('courseInfo');
  }
}

// Function to add menu item to a section
function addMenuItem(sectionName, newItem) {
  // Get current menu items from local storage
  const menuItems = JSON.parse(localStorage.getItem('menuItems') || '{}');
  
  // Initialize menu items for section if not exists
  if (!menuItems[sectionName]) {
    menuItems[sectionName] = getDefaultMenuItems(sectionName);
  }
  
  // Add new item to menu items
  menuItems[sectionName].push(newItem);
  
  // Save to local storage
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
  
  // Update UI
  updateSidebar(sectionName);
}

// Function to delete menu item from a section
function deleteMenuItem(sectionName, itemName) {
  // Get current menu items from local storage
  const menuItems = JSON.parse(localStorage.getItem('menuItems') || '{}');
  
  if (menuItems[sectionName]) {
    // Remove the item from the array
    menuItems[sectionName] = menuItems[sectionName].filter(item => item !== itemName);
    
    // Save to local storage
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    
    // Update UI
    updateSidebar(sectionName);
  }
}

// Function to add a new section
function addNewSection(sectionName, afterSection) {
  // Get current data from local storage
  const sectionNames = JSON.parse(localStorage.getItem('sectionNames') || '{}');
  const menuItems = JSON.parse(localStorage.getItem('menuItems') || '{}');
  
  // Initialize menu items for new section
  menuItems[sectionName] = [];
  sectionNames[sectionName] = sectionName; // Add to section names
  
  // Save to local storage
  localStorage.setItem('sectionNames', JSON.stringify(sectionNames));
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
  
  // Create container div for the new section
  const contentContainer = document.getElementById('content-container');
  const newSection = document.createElement('div');
  newSection.id = sectionName.toLowerCase().replace(/\s+/g, '-');
  newSection.className = 'w3-container w3-padding-64 hidden';
  newSection.innerHTML = `
    <div class="container">
      <div class="header">${sectionName}</div>
      <!-- Add your section content here -->
    </div>
  `;
  contentContainer.appendChild(newSection);
  
  // Add to navbar
  const navbar = document.querySelector('.w3-top .w3-bar');
  const newLink = document.createElement('a');
  newLink.href = 'javascript:void(0)';
  newLink.className = 'w3-bar-item w3-button';
  newLink.textContent = sectionName;
  
  // Add click event listener
  newLink.addEventListener('click', function(event) {
    showContent(sectionName.toLowerCase().replace(/\s+/g, '-'), event);
  });
  
  // Find the reference section in navbar
  const navbarLinks = Array.from(navbar.querySelectorAll('.w3-bar-item'));
  let referenceLink = navbarLinks.find(link => link.textContent.trim() === afterSection);
  
  // Insert after the reference section
  if (referenceLink) {
    if (referenceLink.nextSibling) {
      navbar.insertBefore(newLink, referenceLink.nextSibling);
    } else {
      navbar.appendChild(newLink);
    }
  } else {
    // If reference section not found, insert before Admin Page
    const adminLink = navbar.querySelector('a[onclick*="admin-page"]');
    if (adminLink) {
      navbar.insertBefore(newLink, adminLink);
    } else {
      navbar.appendChild(newLink);
    }
  }
}

// Function to handle eye icon click in menu layout view
function handleMenuEyeClick(menuItem) {
  // Hide the menu layout view
  document.getElementById('menu-layout-view').classList.add('hidden');
  
  // Show the admin contents layout
  const adminContentsLayout = document.getElementById('admin-contents-layout');
  adminContentsLayout.classList.remove('hidden');
  
  // Update the selected section title
  const sectionName = document.getElementById('selected-section').textContent;
  document.getElementById('selected-content-section').textContent = sectionName + " / " + menuItem;
}

// Function to populate content items
function populateContentItems(sectionName, menuItem) {
  const table = document.querySelector('#admin-contents-layout table');
  
  // Clear existing rows except header
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  
  // Add default content items based on section and menu item
  let contentItems = [];
  if (sectionName === "Trang chủ" && menuItem === "Thông tin semina") {
    contentItems = [
      "Semina hôm nay",
      "Nội dung semina hôm nay",
      "Ảnh semina hôm nay"
    ];
  }
  
  // Add content items to table
  contentItems.forEach(item => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${item}</td>
      <td><i class="fas fa-eye"></i></td>
      <td><i class="fas fa-edit"></i></td>
      <td><i class="fas fa-times"></i></td>
    `;
    addContentEventListeners(row);
  });
}

// Function to add new content
function addNewContent() {
  const newContentName = prompt('Nhập tên mục content mới:');
  if (newContentName) {
    const table = document.querySelector('#admin-contents-layout table');
    const newRow = table.insertRow();
    newRow.innerHTML = `
      <td>${newContentName}</td>
      <td><i class="fas fa-eye"></i></td>
      <td><i class="fas fa-edit"></i></td>
      <td><i class="fas fa-times"></i></td>
    `;
  }
}

// Function to add event listeners to content row icons
function addContentEventListeners(row) {
  // Add eye icon listener
  const eyeIcon = row.querySelector('.fa-eye');
  if (eyeIcon) {
    eyeIcon.addEventListener('click', function() {
      const contentName = this.closest('tr').cells[0].textContent;
      alert('Viewing content: ' + contentName);
    });
  }

  // Add edit icon listener
  const editIcon = row.querySelector('.fa-edit');
  if (editIcon) {
    editIcon.addEventListener('click', function() {
      const row = this.closest('tr');
      const currentName = row.cells[0].textContent;
      const newName = prompt('Sửa tên mục:', currentName);
      if (newName) {
        row.cells[0].textContent = newName;
      }
    });
  }

  // Add delete icon listener
  const deleteIcon = row.querySelector('.fa-times');
  if (deleteIcon) {
    deleteIcon.addEventListener('click', function() {
      if (confirm('Bạn có chắc chắn muốn xóa mục này?')) {
        this.closest('tr').remove();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Add return button handler for menu layout view
  document.getElementById('returnButton').addEventListener('click', function() {
    document.getElementById('menu-layout-view').classList.add('hidden');
    document.getElementById('admin-menu-top').classList.remove('hidden');
  });

  // Add return button handler for admin contents layout
  document.getElementById('returnFromContents').addEventListener('click', function() {
    document.getElementById('admin-contents-layout').classList.add('hidden');
    document.getElementById('menu-layout-view').classList.remove('hidden');
  });

  // Add event listeners to eye icons in menu layout view
  const menuLayoutEyeIcons = document.querySelectorAll('#menu-layout-view .fa-eye');
  menuLayoutEyeIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const menuItem = this.closest('tr').cells[0].textContent;
      handleMenuEyeClick(menuItem);
    });
  });

  // Add event listeners to eye icons in admin menu top
  const adminMenuTopEyeIcons = document.querySelectorAll('.admin-menu-section .fa-eye');
  adminMenuTopEyeIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const sectionName = this.closest('tr').querySelector('td').textContent;
      
      // Hide the admin menu top section
      document.getElementById('admin-menu-top').classList.add('hidden');
      
      // Show the menu layout view
      const menuLayoutView = document.getElementById('menu-layout-view');
      menuLayoutView.classList.remove('hidden');
      
      // Update the selected section title
      document.getElementById('selected-section').textContent = sectionName;
      
      // Populate the menu layout
      populateMenuLayout(sectionName);
    });
  });
});

// Modify the edit icon click handler
document.addEventListener('DOMContentLoaded', function() {
  const eyeIcons = document.querySelectorAll('.admin-menu-section .fa-eye');
  
  // Add return button handler
  document.getElementById('returnButton').addEventListener('click', function() {
    document.getElementById('menu-layout-view').classList.add('hidden');
    document.getElementById('admin-menu-top').classList.remove('hidden');
    
    // Clear sidebar by setting empty content
    const sidebar = document.getElementById("mySidebar");
    sidebar.innerHTML = '';
  });
  
  eyeIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      // Get the section name from the row
      const sectionName = this.closest('tr').querySelector('td').textContent;
      
      // Hide the admin menu top section
      document.getElementById('admin-menu-top').classList.add('hidden');
      
      // Show the menu layout view
      const menuLayoutView = document.getElementById('menu-layout-view');
      menuLayoutView.classList.remove('hidden');
      
      // Update the selected section title
      document.getElementById('selected-section').textContent = sectionName;
      
      // Populate the table based on the section
      populateMenuLayout(sectionName);

      // Update sidebar with menu items
      updateSidebar(sectionName);
    });
  });

  // Add handlers for plus icons
  const plusIcons = document.querySelectorAll('.admin-menu-section .fa-plus');
  plusIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const row = this.closest('tr');
      const currentSection = row.cells[0].textContent;
      const newItemName = prompt('Nhập tên menu mới:');
      if (newItemName) {
        addNewSection(newItemName, currentSection);
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${newItemName}</td>
          <td><i class="fas fa-eye"></i></td>
          <td><i class="fas fa-edit"></i></td>
          <td><i class="fas fa-times"></i></td>
          <td><i class="fas fa-plus"></i></td>
        `;
        row.parentNode.insertBefore(newRow, row.nextSibling);
        
        // Add event listeners to new icons
        addIconEventListeners(newRow);
      }
    });
  });

  // Add handlers for edit icons
  const editIcons = document.querySelectorAll('.admin-menu-section .fa-edit');
  editIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const row = this.closest('tr');
      const currentName = row.cells[0].textContent;
      const newName = prompt('Sửa tên menu:', currentName);
      if (newName) {
        updateSectionName(currentName, newName);
        row.cells[0].textContent = newName;
      }
    });
  });

  // Add handlers for delete icons
  const deleteIcons = document.querySelectorAll('.admin-menu-section .fa-times');
  deleteIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const row = this.closest('tr');
      const sectionName = row.cells[0].textContent;
      if (confirm('Bạn có chắc chắn muốn xóa menu này?')) {
        deleteSection(sectionName);
        row.remove();
      }
    });
  });

  // Load section names from local storage on page load
  loadSectionNames();
});

function populateMenuLayout(sectionName) {
  const menuItems = getMenuItems(sectionName);
  const table = document.querySelector('#menu-layout-view table');
  
  // Clear existing rows except header
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  
  // Add menu items
  menuItems.forEach(item => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${item}</td>
      <td><i class="fas fa-eye"></i></td>
      <td><i class="fas fa-edit"></i></td>
      <td><i class="fas fa-times"></i></td>
      <td><i class="fas fa-plus"></i></td>
    `;
  });

  // Add event listeners to all icons in the table
  const rows = table.querySelectorAll('tr:not(:first-child)');
  rows.forEach(row => {
    addIconEventListeners(row);
  });
}

function updateSidebar(sectionName) {
  const sidebar = document.getElementById("mySidebar");
  const menuItems = getMenuItems(sectionName);
  
  // Clear existing sidebar content
  sidebar.innerHTML = `
    <h4 class="w3-bar-item"><b>Menu "${sectionName}"</b></h4>
  `;

  // Add menu items to sidebar
  menuItems.forEach(item => {
    const link = document.createElement('a');
    link.className = 'w3-bar-item w3-button w3-hover-black';
    link.href = '#';
    link.textContent = item;
    sidebar.appendChild(link);
  });
}

// Function to add event listeners to icons in a row
function addIconEventListeners(row) {
  // Add eye icon listener
  const eyeIcon = row.querySelector('.fa-eye');
  if (eyeIcon) {
    eyeIcon.addEventListener('click', function() {
      const itemName = this.closest('tr').cells[0].textContent;
      const sectionName = document.getElementById('selected-section').textContent;
      // Handle view action
      console.log(`Viewing item: ${itemName} in section: ${sectionName}`);
    });
  }

  // Add edit icon listener
  const editIcon = row.querySelector('.fa-edit');
  if (editIcon) {
    editIcon.addEventListener('click', function() {
      const row = this.closest('tr');
      const currentName = row.cells[0].textContent;
      const newName = prompt('Sửa tên mục:', currentName);
      if (newName) {
        const sectionName = document.getElementById('selected-section').textContent;
        const menuItems = getMenuItems(sectionName);
        const index = menuItems.indexOf(currentName);
        if (index !== -1) {
          menuItems[index] = newName;
          localStorage.setItem('menuItems', JSON.stringify({
            ...JSON.parse(localStorage.getItem('menuItems') || '{}'),
            [sectionName]: menuItems
          }));
          row.cells[0].textContent = newName;
          updateSidebar(sectionName);
        }
      }
    });
  }

  // Add delete icon listener
  const deleteIcon = row.querySelector('.fa-times');
  if (deleteIcon) {
    deleteIcon.addEventListener('click', function() {
      const row = this.closest('tr');
      const sectionName = document.getElementById('selected-section').textContent;
      const itemName = row.cells[0].textContent;
      if (confirm('Bạn có chắc chắn muốn xóa mục này?')) {
        deleteMenuItem(sectionName, itemName);
        row.remove();
      }
    });
  }

  // Add plus icon listener
  const plusIcon = row.querySelector('.fa-plus');
  if (plusIcon) {
    plusIcon.addEventListener('click', function() {
      const sectionName = document.getElementById('selected-section').textContent;
      const newItemName = prompt('Nhập tên mục mới:');
      if (newItemName) {
        addMenuItem(sectionName, newItemName);
        populateMenuLayout(sectionName);
      }
    });
  }
}

