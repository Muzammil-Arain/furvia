import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Wrapper, Header, Typography } from 'components/index';
import { COLORS, IMAGES } from 'utils/index';
import { COMMON_TEXT } from 'constants/index';
import { AppWrapper } from 'components/common/AppWapper';
import { ms } from 'react-native-size-matters';

const WalletScreens = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');

  const weeklyEarnings = [
    { id: 1, title: 'This Week', jobs: 8, amount: '$680', rate: '$85/job' },
    { id: 2, title: 'Last Week', jobs: 9, amount: '$680', rate: '$85/job' },
    { id: 3, title: '2 Weeks Ago', jobs: 7, amount: '$680', rate: '$85/job' },
    { id: 4, title: '3 Weeks Ago', jobs: 8, amount: '$680', rate: '$85/job' },
  ];

  const transactions = [
    { id: 1, title: 'Cash Withdrawal', date: 'Oct 15, 2025', amount: '-$250' },
    { id: 2, title: 'Job Completed', date: 'Oct 14, 2025', amount: '+$85' },
    { id: 3, title: 'Job Completed', date: 'Oct 13, 2025', amount: '+$85' },
    { id: 4, title: 'Cash Withdrawal', date: 'Oct 10, 2025', amount: '-$200' },
  ];

  return (
    <AppWrapper title='Earnings'>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Typography style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              Overview
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <Typography style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
              Transaction History
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Overview Content */}
        {activeTab === 'overview' ? (
          <>
            {/* Balance Card */}
            <LinearGradient
              colors={['#f9d4b3', '#e4c4f0', '#c4e0f9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.balanceCard}
            >
              <Typography style={styles.balanceLabel}>Available Balance</Typography>
              <Typography style={styles.balanceAmount}>$680.12</Typography>
              <TouchableOpacity style={styles.withdrawBtn}>
                <Ionicons name='cash-outline' size={16} color={COLORS.BLACK} />
                <Typography style={styles.withdrawText}>Cash Withdrawal</Typography>
              </TouchableOpacity>
            </LinearGradient>

            {/* Today / This Month */}
            <View style={styles.statsRow}>
              <View style={styles.statsBox}>
                <Ionicons name='logo-usd' size={22} color={COLORS.PRIMARY} />
                <Typography style={styles.statsAmount}>$240</Typography>
                <Typography style={styles.statsLabel}>Today</Typography>
              </View>
              <View style={styles.statsBox}>
                <Ionicons name='logo-usd' size={22} color={COLORS.CYAN} />
                <Typography style={styles.statsAmount}>$2850</Typography>
                <Typography style={styles.statsLabel}>This Month</Typography>
              </View>
            </View>

            {/* Performance */}
            <View style={styles.section}>
              <Typography style={styles.sectionTitle}>Performance</Typography>
              <View style={styles.performanceRow}>
                <View style={styles.performanceBox}>
                  <Ionicons name='star' size={22} color='#FFD233' />
                  <Typography style={styles.performanceValue}>4.0</Typography>
                  <Typography style={styles.performanceLabel}>Rating</Typography>
                </View>
                <View style={styles.performanceBox}>
                  <Ionicons name='gift-outline' size={22} color='#47CACC' />
                  <Typography style={styles.performanceValue}>1</Typography>
                  <Typography style={styles.performanceLabel}>Job Done</Typography>
                </View>
                <View style={styles.performanceBox}>
                  <Ionicons name='time-outline' size={22} color='#7A3DF0' />
                  <Typography style={styles.performanceValue}>98%</Typography>
                  <Typography style={styles.performanceLabel}>On-Time</Typography>
                </View>
              </View>
            </View>

            {/* Weekly Earnings */}
            <View style={styles.section}>
              <Typography style={styles.sectionTitle}>Weekly Earnings</Typography>
              {weeklyEarnings.map(item => (
                <View key={item.id} style={styles.weekCard}>
                  <View>
                    <Typography style={styles.weekTitle}>{item.title}</Typography>
                    <Typography style={styles.weekSub}>{item.jobs} jobs completed</Typography>
                  </View>
                  <View>
                    <Typography style={styles.weekAmount}>{item.amount}</Typography>
                    <Typography style={styles.weekRate}>{item.rate}</Typography>
                  </View>
                </View>
              ))}
            </View>

            {/* Payment Method */}
            <View style={styles.section}>
              <Typography style={styles.sectionTitle}>Payment Method</Typography>
              <View style={styles.paymentCard}>
                <Typography style={styles.paymentLabel}>Bank Account</Typography>
                <View style={styles.paymentRow}>
                  <Typography style={styles.paymentMasked}>**** **** **** 1234</Typography>
                  <View style={styles.verifiedBadge}>
                    <Typography style={styles.verifiedText}>Verified</Typography>
                  </View>
                </View>
                <Typography style={styles.paymentFooter}>
                  Next pay out: Friday, October 10th
                </Typography>
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Transaction History */}
            <View style={{ marginTop: 20 }}>
              {transactions.map(item => (
                <View key={item.id} style={styles.transactionCard}>
                  <View>
                    <Typography style={styles.transactionTitle}>{item.title}</Typography>
                    <Typography style={styles.transactionDate}>{item.date}</Typography>
                  </View>
                  <Typography
                    style={[
                      styles.transactionAmount,
                      { color: item.amount.includes('-') ? COLORS.RED : COLORS.GREEN },
                    ]}
                  >
                    {item.amount}
                  </Typography>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 50 },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 12,
    marginVertical: 20,
  },
  tab: {
    width: ms(145),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ms(8),
    borderRadius: 12,
  },
  tabText: { fontSize: ms(12), color: COLORS.GRAY_500 },
  activeTab: { backgroundColor: COLORS.HEADER_BACKGROUND },
  activeTabText: { color: COLORS.WHITE, fontWeight: '600' },
  balanceCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
  },
  balanceLabel: { fontSize: 14, color: COLORS.BLACK },
  balanceAmount: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.BLACK,
    marginVertical: 8,
  },
  withdrawBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  withdrawText: {
    fontSize: 14,
    color: COLORS.BLACK,
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statsBox: {
    width: '48%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 16,
    elevation: 2,
  },
  statsAmount: { fontSize: ms(18), fontWeight: '600', color: COLORS.BLACK, marginTop: 6 },
  statsLabel: { fontSize: ms(12), color: '#555555' },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: ms(16), fontWeight: '600', color: COLORS.BLACK, marginBottom: 14 },
  performanceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  performanceBox: {
    width: '30%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
    elevation: 2,
  },
  performanceValue: { fontSize: 16, fontWeight: '600', color: COLORS.BLACK, marginTop: 6 },
  performanceLabel: { fontSize: 13, color: COLORS.GRAY_600 },
  weekCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 2,
  },
  weekTitle: { fontSize: ms(15), fontWeight: '600', color: COLORS.BLACK },
  weekSub: { fontSize: ms(11), color: '#555555 ' },
  weekRate: { fontSize: ms(12), color: '#666666' },
  weekAmount: { fontSize: ms(16), fontWeight: '700', color: COLORS.SECONDARY, textAlign: 'right' },
  paymentCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  paymentLabel: { fontSize: 15, fontWeight: '600', color: COLORS.BLACK, marginBottom: 6 },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  paymentMasked: { fontSize: 14, color: COLORS.GRAY_600 },
  verifiedBadge: {
    backgroundColor: '#D7F3F3',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  verifiedText: { color: COLORS.PRIMARY, fontSize: 12, fontWeight: '600' },
  paymentFooter: { fontSize: 13, color: COLORS.GRAY_600, marginTop: 6 },
  transactionCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  transactionTitle: { fontSize: 15, fontWeight: '500', color: COLORS.BLACK },
  transactionDate: { fontSize: 13, color: COLORS.GRAY_600 },
  transactionAmount: { fontSize: 16, fontWeight: '700' },
});

export default WalletScreens;
