import ListViewIcon from '@/components/icons/view/ListViewIcon';
import GridViewIcon from '@/components/icons/view/GridViewIcon';
import styles from './ViewSwitcher.module.css';

type ViewMode = 'list' | 'grid';

interface ViewSwitcherProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export default function ViewSwitcher({
  viewMode,
  onViewChange,
}: ViewSwitcherProps) {
  return (
    <div className={styles.viewSwitcher}>
      <button
        onClick={() => onViewChange('list')}
        aria-label='Переключить в список'
      >
        <ListViewIcon active={viewMode === 'list'} />
      </button>
      <button
        onClick={() => onViewChange('grid')}
        aria-label='Переключить в сетку'
      >
        <GridViewIcon active={viewMode === 'grid'} />
      </button>
    </div>
  );
}
