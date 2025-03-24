import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user/user.model";
import {DeviceService} from "../../service/device.service";
import {Device} from "../../model/device/device.model";
import {EncryptionService} from "../../service/encryption.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit {

  users: User[] = [];
  devices: Device[] = [];
  isEditClicked: number | null = null;
  isDeviceEditClicked: number | null = null;
  newUser: User = new User();
  newDevice: Device = new Device();
  isUserTitleClicked: boolean = false;
  isDeviceTitleClicked: boolean = false;
  unselectedRole: string = "Select Role";

  ngOnInit(): void {
    this.newUser.role = '';
    if (this.encryptService.decrypt(sessionStorage.getItem('userRole') as string) !== 'admin') {
      //alert('You are not authorized to view this page');
      this.router.navigateByUrl('/login');
    }
    this.getAllUsers();
    this.getAllDevices();
  }

  addUser() {
    this.addNewUser();
    this.newUser = new User();
  }

  constructor(private userService: UserService, private router: Router, private deviceService: DeviceService, private encryptService: EncryptionService) {
  }

  clickEdit(index: number) {
    this.isEditClicked = index;
  }

  clickDeviceEdit(index: number) {
    this.isDeviceEditClicked = index;
  }

  editUser(user: User) {
    this.editSelectedUser(user);
    this.isEditClicked = null;
  }

  editDevice(device: Device) {
    this.updateDeviceAction(device);
    this.isDeviceEditClicked = null;
  }

  toggleUserClick() {
    this.isUserTitleClicked = !this.isUserTitleClicked;
  }

  toggleDeviceClick() {
    this.isDeviceTitleClicked = !this.isDeviceTitleClicked;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response) {
          this.users = response;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addNewUser() {
    this.userService.addUser(this.newUser).subscribe({
      next: (response) => {
        if (response) {
          this.getAllUsers();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteAction(id: number) {
    this.deleteUser(id);
    this.deleteAssociatedDevices(id);
    this.users = this.users.filter(user => user.id !== id);
    this.devices = this.devices.filter(device => device.userId !== id);
  }

  deleteDeviceAction(id: number) {
    this.deleteDevice(id);
    this.devices = this.devices.filter(device => device.id !== id);
  }

  updateDeviceAction(device: Device) {
    this.updateDevice(device);
    this.isDeviceEditClicked = null;
  }

  editSelectedUser(user: User) {
    this.userService.editUser(user).subscribe({
      next: (response) => {
        if (response) {
          this.getAllUsers();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUserById(id).subscribe({
      next: (response) => {
        if (response) {
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteAssociatedDevices(id: number) {
    this.deviceService.deleteAllByUserId(id).subscribe({
      next: (response) => {
        if (response) {
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getAllDevices() {
    this.deviceService.getAllDevices().subscribe({
      next: (response) => {
        if (response) {
          this.devices = response;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addDevice() {
    this.deviceService.addDevice(this.newDevice).subscribe({
      next: (response) => {
        if (response) {
          this.getAllDevices();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteDevice(id: number) {
    this.deviceService.deleteDeviceById(id).subscribe({
      next: (response) => {
        if (response) {
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateDevice(device: Device) {
    this.deviceService.updateDevice(device).subscribe({
      next: (response) => {
        if (response) {
          this.getAllDevices();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
