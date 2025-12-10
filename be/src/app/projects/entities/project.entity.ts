import {Entity, Column} from 'typeorm';
import {BaseEntity} from '../../common/entities/base.entity';

@Entity('project')
export class Project extends BaseEntity {

  @Column()
  name: string;

  // TODO: Implement when User entity is created
  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'manager_id' })
  // manager: User;

}
