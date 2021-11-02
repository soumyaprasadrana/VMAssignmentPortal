export interface VM {
  id: number;
  ip: string;
  hostname: string;
  os: string;
  ver: string;
  snap_count: number;
  ram: number;
  group: string;
  status: string;
  owner: string;
  comment: string;
  vm_owner_lab: string;
  team: string;
  cssClass?: string;
  global?: string;
}
