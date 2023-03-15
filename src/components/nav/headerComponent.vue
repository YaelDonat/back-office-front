<template>
  <div class="card relative z-2">
    <Menubar :model="items">
      <template #start>
        <img
          alt="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fish_svg_icon.svg/2048px-Fish_svg_icon.svg.png"
          height="40"
          class="mr-2"
        />
      </template>
      <template #end>
        <InputText placeholder="Search" type="text" />
      </template>
    </Menubar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
        },
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Left',
              icon: 'pi pi-fw pi-align-left',
            },
            {
              label: 'Right',
              icon: 'pi pi-fw pi-align-right',
            },
            {
              label: 'Center',
              icon: 'pi pi-fw pi-align-center',
            },
            {
              label: 'Justify',
              icon: 'pi pi-fw pi-align-justify',
            },
          ],
        },
        {
          label: 'Products',
          icon: 'pi pi-fw pi-box',
          items: [
            {
              label: 'Edit',
              icon: 'pi pi-fw pi-pencil',
              items: [
                {
                  label: 'Save',
                  icon: 'pi pi-fw pi-calendar-plus',
                },
                {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-calendar-minus',
                },
              ],
            },
          ],
        },
        {
          label: 'User',
          icon: 'pi pi-fw pi-user',
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off',
        },
      ],
    }
  },
}
</script>
