import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';
import moment = require('moment-timezone');
import { DataTypes } from 'sequelize';
import { Role } from 'src/utils/constants/roles';

@Table
export class User extends Model {
  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Unique
  @Column
  username: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM(Role.Manager, Role.Candidate) })
  role: string;

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
