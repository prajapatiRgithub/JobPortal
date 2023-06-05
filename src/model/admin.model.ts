import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';
import moment = require('moment-timezone');

@Table
export class Admin extends Model {
  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
    this.updated_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
  }

  @Column({ defaultValue: false })
  is_deleted: boolean;
}
