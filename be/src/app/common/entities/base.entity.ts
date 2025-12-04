import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Base entity with common fields for all entities in the system.
 *
 * Provides:
 * - UUID primary key (can be overridden in child entities if needed)
 * - Automatic timestamp tracking (createdAt, updatedAt)
 * - Soft delete support (deletedAt)
 *
 * Future enhancements will include audit fields:
 * - createdBy: User ID who created the record
 * - modifiedBy: User ID who last modified the record
 * - changeHistory: JSON field for tracking field-level changes
 *
 * @abstract
 */
export abstract class BaseEntity {
  /**
   * UUID primary key.
   * Child entities can override this if a different primary key strategy is needed.
   * Example override in child:
   * @PrimaryColumn()
   * id: string;
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Timestamp when the record was created.
   * Automatically set by TypeORM on insert.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Timestamp when the record was last updated.
   * Automatically updated by TypeORM on save.
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Timestamp when the record was soft deleted.
   * When set, the record is excluded from normal queries.
   * Use withDeleted() or onlyDeleted() to include soft-deleted records.
   */
  @DeleteDateColumn()
  deletedAt?: Date;

  // TODO: Add audit fields in future implementation
  // @Column({ type: 'uuid', nullable: true })
  // createdBy?: string;
  //
  // @Column({ type: 'uuid', nullable: true })
  // modifiedBy?: string;
  //
  // @Column({ type: 'jsonb', nullable: true })
  // changeHistory?: Record<string, any>[];
}
