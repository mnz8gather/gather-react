import React, { useState, useEffect } from 'react';
import { LineNoteContribution } from './LineNoteContribution';

interface PerformanceStats {
  totalNotes: number;
  visibleNotes: number;
  memoryUsage: string;
  renderTime: number;
}

interface LineNotePerformanceMonitorProps {
  contribution: LineNoteContribution | null;
  enabled?: boolean;
}

const LineNotePerformanceMonitor: React.FC<LineNotePerformanceMonitorProps> = ({ contribution, enabled = false }) => {
  const [stats, setStats] = useState<PerformanceStats>({
    totalNotes: 0,
    visibleNotes: 0,
    memoryUsage: '0 KB',
    renderTime: 0,
  });

  useEffect(() => {
    if (!enabled || !contribution) return;

    const updateStats = () => {
      const startTime = performance.now();

      const contributionStats = contribution.getStats();
      const memoryInfo = (performance as any).memory;

      setStats({
        totalNotes: contributionStats.total,
        visibleNotes: contributionStats.visible,
        memoryUsage: memoryInfo ? `${Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024)} MB` : 'N/A',
        renderTime: performance.now() - startTime,
      });
    };

    // 初始更新
    updateStats();

    // 定期更新统计信息
    const interval = setInterval(updateStats, 1000);

    return () => clearInterval(interval);
  }, [contribution, enabled]);

  if (!enabled) return null;

  const efficiency = stats.totalNotes > 0 ? Math.round((stats.visibleNotes / stats.totalNotes) * 100) : 0;

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 1000,
        minWidth: '200px',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>📊 LineNote Performance</div>

      <div style={{ display: 'grid', gap: '2px' }}>
        <div>
          Total Notes: <span style={{ color: '#ffa500' }}>{stats.totalNotes}</span>
        </div>
        <div>
          Visible Notes: <span style={{ color: '#00ff00' }}>{stats.visibleNotes}</span>
        </div>
        <div>
          Efficiency:{' '}
          <span
            style={{
              color: efficiency > 50 ? '#00ff00' : efficiency > 20 ? '#ffa500' : '#ff4444',
            }}
          >
            {efficiency}%
          </span>
        </div>
        <div>
          Memory: <span style={{ color: '#87ceeb' }}>{stats.memoryUsage}</span>
        </div>
        <div>
          Render Time: <span style={{ color: '#dda0dd' }}>{stats.renderTime.toFixed(2)}ms</span>
        </div>
      </div>

      {efficiency < 20 && stats.totalNotes > 10 && (
        <div
          style={{
            marginTop: '5px',
            padding: '3px',
            backgroundColor: 'rgba(255, 68, 68, 0.2)',
            borderRadius: '3px',
            fontSize: '10px',
          }}
        >
          ⚠️ Low efficiency detected. Consider scrolling to see optimization benefits.
        </div>
      )}
    </div>
  );
};

export default LineNotePerformanceMonitor;
