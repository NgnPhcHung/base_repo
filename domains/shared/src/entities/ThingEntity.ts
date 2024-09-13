import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { BaseEntity } from "./BaseEntity";
import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";

export abstract class ThingEntity extends BaseEntity {
  /**
   * indicates the origin of the entry, is a GUID
   */
  @ApiProperty()
  @AutoMap()
  @Column({ nullable: true, type: "uuid" })
  hash?: string;

  /**
   * the user who creates the data
   */
  @ApiProperty()
  @AutoMap()
  @Column({ nullable: true })
  createdBy?: string;

  /**
   * the user who updates the data
   */
  @ApiProperty()
  @AutoMap()
  @Column({ nullable: true })
  updatedBy?: string;

  /**
   * Flag to mark it as non-actual
   */
  @ApiProperty()
  @AutoMap()
  @Column({ default: false })
  isArchived?: boolean = false;

  @CreateDateColumn()
  dateCreate?: Date;

  /**
   * Timestamp when the entity was last updated.
   */
  @ApiProperty()
  @AutoMap()
  @UpdateDateColumn()
  dateUpdate?: Date;

  @BeforeInsert()
  generateHash() {
    this.hash = uuid();
  }
}
