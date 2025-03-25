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

// Modify the click handlers for eye icons
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
      const newItemName = prompt('Nhập tên menu mới:');
      if (newItemName) {
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
        row.cells[0].textContent = newName;
      }
    });
  });

  // Add handlers for delete icons
  const deleteIcons = document.querySelectorAll('.admin-menu-section .fa-times');
  deleteIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const row = this.closest('tr');
      if (confirm('Bạn có chắc chắn muốn xóa menu này?')) {
        row.remove();
      }
    });
  });
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
    `;
  });
}

function getMenuItems(sectionName) {
  // Return different menu items based on the section
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

// Function to add event listeners to icons in a new row
function addIconEventListeners(row) {
  // Add eye icon listener
  const eyeIcon = row.querySelector('.fa-eye');
  if (eyeIcon) {
    eyeIcon.addEventListener('click', function() {
      const sectionName = this.closest('tr').querySelector('td').textContent;
      document.getElementById('admin-menu-top').classList.add('hidden');
      document.getElementById('menu-layout-view').classList.remove('hidden');
      document.getElementById('selected-section').textContent = sectionName;
      populateMenuLayout(sectionName);
      updateSidebar(sectionName);
    });
  }

  // Add edit icon listener
  const editIcon = row.querySelector('.fa-edit');
  if (editIcon) {
    editIcon.addEventListener('click', function() {
      const currentName = this.closest('tr').cells[0].textContent;
      const newName = prompt('Sửa tên menu:', currentName);
      if (newName) {
        this.closest('tr').cells[0].textContent = newName;
      }
    });
  }

  // Add delete icon listener
  const deleteIcon = row.querySelector('.fa-times');
  if (deleteIcon) {
    deleteIcon.addEventListener('click', function() {
      if (confirm('Bạn có chắc chắn muốn xóa menu này?')) {
        this.closest('tr').remove();
      }
    });
  }

  // Add plus icon listener
  const plusIcon = row.querySelector('.fa-plus');
  if (plusIcon) {
    plusIcon.addEventListener('click', function() {
      const newItemName = prompt('Nhập tên menu mới:');
      if (newItemName) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${newItemName}</td>
          <td><i class="fas fa-eye"></i></td>
          <td><i class="fas fa-edit"></i></td>
          <td><i class="fas fa-times"></i></td>
          <td><i class="fas fa-plus"></i></td>
        `;
        this.closest('tr').parentNode.insertBefore(newRow, this.closest('tr').nextSibling);
        addIconEventListeners(newRow);
      }
    });
  }
}

