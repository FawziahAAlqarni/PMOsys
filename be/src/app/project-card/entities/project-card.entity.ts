import {Entity, Column} from 'typeorm';
import {BaseEntity} from '../../common/entities/base.entity';

@Entity('project_cards')
export class ProjectCard extends BaseEntity {
  @Column()
  name: string;

  @Column({type: 'decimal', precision: 15, scale: 2})
  estimatedBudget: number;

  @Column({type: 'int'})
  durationInWeeks: number;

  // TODO: Implement when User entity is created - owner of the project
  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'owner_id' })
  // owner: User;

  // TODO: Implement when Program entity is created
  // @ManyToOne(() => Program, { nullable: true })
  // @JoinColumn({ name: 'program_id' })
  // program?: Program;

  // TODO: Implement when Portfolio entity is created
  // @ManyToOne(() => Portfolio)
  // @JoinColumn({ name: 'portfolio_id' })
  // portfolio: Portfolio;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'text', nullable: true})
  learnedLessons: string;

  @Column({type: 'text', nullable: true})
  dependencies: string;

  // TODO: Store as JSON array of user IDs until User entity is created
  @Column({type: 'jsonb', nullable: true})
  technicalCommittee: string[];

  // TODO: Implement when StrategicObjective entity is created
  // @ManyToOne(() => StrategicObjective, { nullable: true })
  // @JoinColumn({ name: 'strategic_objective_id' })
  // strategicObjective?: StrategicObjective;

  // TODO: Implement when StrategicOutcome entity is created
  // @ManyToOne(() => StrategicOutcome, { nullable: true })
  // @JoinColumn({ name: 'strategic_outcome_id' })
  // strategicOutcome?: StrategicOutcome;

  @Column({type: 'jsonb', default: []})
  risks: Array<any>;

  @Column({type: 'int', default: 0})
  currentGateIndex: number;

  // Store gate requirements progress as a JSON object
  // Format: { "0": { "0": true, "1": false, "2": true }, "1": { ... } }
  // Where first key is gate index, second key is requirement index
  @Column({type: 'jsonb', default: {}})
  gateRequirementsState: Record<string, Record<string, boolean>>;

  @Column({type: 'varchar', default: 'active'})
  status: string;
}
