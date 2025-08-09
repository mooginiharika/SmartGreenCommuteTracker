import React, { useState } from 'react';
import { Share2, Users, Gift, Copy, Check, Mail, MessageCircle } from 'lucide-react';

interface ReferralPageProps {
  user: any;
}

function ReferralPage({ user }: ReferralPageProps) {
  const [copied, setCopied] = useState(false);
  const [referralCode] = useState(`GREEN${user.id.toUpperCase()}2025`);
  const [referralLink] = useState(`https://greencommute.app/join?ref=${referralCode}`);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareOptions = [
    {
      name: 'Email',
      icon: Mail,
      action: () => {
        const subject = 'Join me on Green Commute Tracker!';
        const body = `Hey! I've been using Green Commute Tracker to track my eco-friendly commutes and it's amazing! Join me and let's make a positive environmental impact together.\n\nUse my referral code: ${referralCode}\nOr click this link: ${referralLink}\n\nYou'll get 100 bonus points when you sign up!`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      }
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      action: () => {
        const message = `Hey! Join me on Green Commute Tracker and let's make a positive environmental impact together! 🌱\n\nUse my referral code: ${referralCode}\nOr click: ${referralLink}\n\nYou'll get 100 bonus points when you sign up! 🎉`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
      }
    }
  ];

  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    pointsEarned: 1200,
    thisMonth: 3
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Refer Friends</h2>
        <p className="text-gray-600">Earn points by inviting friends to join the green movement</p>
      </div>

      {/* Referral Rewards */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Referral Rewards</h3>
            <p className="text-purple-100">Earn points for every friend who joins</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">100 pts</div>
            <div className="text-purple-100 text-sm">You get</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">100 pts</div>
            <div className="text-purple-100 text-sm">Friend gets</div>
          </div>
        </div>
      </div>

      {/* Referral Code */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Code</h3>
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-xl font-bold text-green-600">{referralCode}</div>
              <div className="text-sm text-gray-500">Share this code with friends</div>
            </div>
            <button
              onClick={() => handleCopy(referralCode)}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 break-all">{referralLink}</div>
              <div className="text-sm text-gray-500">Direct signup link</div>
            </div>
            <button
              onClick={() => handleCopy(referralLink)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors ml-4"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Share Options */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Share with Friends
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {shareOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <option.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-900">{option.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Referral Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Your Referral Stats
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{referralStats.totalReferrals}</div>
            <div className="text-sm text-gray-600">Total Referrals</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{referralStats.activeReferrals}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">{referralStats.pointsEarned}</div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-600">{referralStats.thisMonth}</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How Referrals Work</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <div className="font-medium text-gray-900">Share your code</div>
              <div className="text-sm text-gray-600">Send your referral code or link to friends</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <div className="font-medium text-gray-900">Friend signs up</div>
              <div className="text-sm text-gray-600">They create an account using your referral code</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <div className="font-medium text-gray-900">Both earn points</div>
              <div className="text-sm text-gray-600">You both get 100 bonus points instantly!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralPage;