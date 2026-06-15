const form = document.querySelector(".equipment-form");
const tableBody = document.querySelector(".equipment-table tbody");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector("input").value.trim();
    const selects = form.querySelectorAll("select");

    const category = selects[0].value;
    const status = selects[1].value;

    if (name === "") {
        alert("Введите название");
        return;
    }

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${category}</td>
        <td>${status}</td>
        <td>
            <button class="equipment-table__delete">
                Удалить
            </button>
        </td>
    `;

    tableBody.appendChild(row);

    form.reset();

    row.querySelector(".equipment-table__delete").addEventListener("click", () => {
        row.remove();
    });
});

const filterCategory = document.querySelectorAll(".equipment-filters__select")[0];
const filterStatus = document.querySelectorAll(".equipment-filters__select")[1];

filterCategory.addEventListener("change", filterRows);
filterStatus.addEventListener("change", filterRows);

function filterRows() {
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(function (row) {
        const category = row.children[1].textContent;
        const status = row.children[2].textContent;

        const categoryMatch =
            filterCategory.value === "Все категории" ||
            category === filterCategory.value;

        const statusMatch =
            filterStatus.value === "Все статусы" ||
            status === filterStatus.value;

        if (categoryMatch && statusMatch) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
